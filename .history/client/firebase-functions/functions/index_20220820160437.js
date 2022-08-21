const functions = require("firebase-functions");
const sgMail = require("@sendgrid/mail");
const fetch = require("cross-fetch");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

sgMail.setApiKey(
  "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"
);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmFwcGVhci5pbiIsImF1ZCI6Imh0dHBzOi8vYXBpLmFwcGVhci5pbi92MSIsImV4cCI6OTAwNzE5OTI1NDc0MDk5MSwiaWF0IjoxNjYwOTYxOTk2LCJvcmdhbml6YXRpb25JZCI6MTY3MTYxLCJqdGkiOiI3MWIwZjdjMS00NTY3LTQzMDUtOTNmMi1jZDRkOTYzYmU1MGIifQ.Wvcf_My8-Ub50q5ymz6j5c3WrP5fKFoDW6Zlf8RYxb4";
const data = {
  endDate: "2099-02-18T14:23:00.000Z",
  fields: ["hostRoomUrl"],
};

exports.store = functions.https.onRequest((request, response) => {
  const db = admin.firestore();
  const order = {
    orderID: "E2H45JW",
    token: "dsafdsafdsafdsafasf",
  };
  db.collection("event")
    .add(order)
    .then(
      () => {
        console.log("added order");
        response.send("Added order");
      },
      (error) => {
        console.error("Failed to add order");
        console.error(error);
        response.send("Fail");
      }
    );
});

function getResponse() {
  return fetch("https://api.whereby.dev/v1/meetings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

exports.eventAdded = functions.firestore
  .document("event/{eventId}")
  .onCreate((snap, context) => {
    console.log("Event added: ", snap.data());
    let meetingRoom = "asss";
    getResponse().then(async (res) => {
      console.log("Status code:", res.status);
      const data = await res.json();
      meetingRoom = data.roomUrl;
      console.log("Room URL:", data.roomUrl);
      console.log("Host room URL:", data.hostRoomUrl);
    });

    let msg = {
      to: "victorjosuepimentel21@gmail.com", // Change to your recipient
      from: "mohammadnayeem2000@gmail.com", // Change to your verified sender
      subject: "Test Email",
      text: `Your group has scheduled a video chat from ${
        snap.data().startTime
      } to ${
        snap.data().endTime
      }. Click the link to join the meeting: ${meetingRoom}.`,
    };
    sgMail
      .send(msg)
      .then((response) => {
        // console.log(response[0].statusCode);
        // console.log(response[0].headers);
      })
      .catch((error) => {
        // console.error(error);
      });
    return Promise.resolve();
  });
