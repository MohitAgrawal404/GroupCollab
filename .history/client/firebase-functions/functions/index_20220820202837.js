const functions = require("firebase-functions");
const sgMail = require("@sendgrid/mail");
const fetch = require("cross-fetch");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

sgMail.setApiKey(
  "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"
);

const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmFwcGVhci5pbiIsImF1ZCI6Imh0dHBzOi8vYXBpLmFwcGVhci5pbi92MSIsImV4cCI6OTAwNzE5OTI1NDc0MDk5MSwiaWF0IjoxNjYwOTYxOTk2LCJvcmdhbml6YXRpb25JZCI6MTY3MTYxLCJqdGkiOiI3MWIwZjdjMS00NTY3LTQzMDUtOTNmMi1jZDRkOTYzYmU1MGIifQ.Wvcf_My8-Ub50q5ymz6j5c3WrP5fKFoDW6Zlf8RYxb4";
const data = {
  endDate: "2099-02-18T14:23:00.000Z",
  fields: ["hostRoomUrl"],
};

const listAllUsers = (nextPageToken) => {
  getAuth()
    .listUsers(1000, nextPageToken)
    .then((listUsersResult) => {
      listUsersResult.users.forEach((userRecord) => {
        console.log("user", userRecord.toJSON());
      });
      if (listUsersResult.pageToken) {
        listAllUsers(listUsersResult.pageToken);
      }
    })
    .catch((error) => {
      console.log("Error listing users:", error);
    });
};

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
  .onCreate(async (snap, context) => {
    let path = context.params.eventId;
    console.log(path);
    const db = admin.firestore();

    getResponse().then(async (res) => {
      console.log("Status code:", res.status);
      const data = await res.json();
      meetingRoom = data.roomUrl;
      //   console.log("Room URL:", data.roomUrl);
      //   console.log("Host room URL:", data.hostRoomUrl);
      db.collection("event").doc(path).update({ roomUrl: data.roomUrl });
    });

    return Promise.resolve();
  });

exports.ev = functions.firestore
  .document("event/{eventId}")
  .onUpdate((change, context) => {
    console.log("Event added: ", change.after.data());
    let meetingRoom = "";

    console.log("CHECKING");
    console.log(change.after.data().roomUrl);

    const msg = {
      to: "victorjosuepimentel21@gmail.com", // Change to your recipient
      from: "mohammadnayeem2000@gmail.com", // Change to your verified sender
      subject: "Test Email ASD",
      text: `Your group has scheduled a video chat from ${
        change.after.data().startTime
      } to ${
        change.after.data().endTime
      }. Click the link to join the meeting: ${change.after.data().roomUrl}.`,
    };
    sgMail
      .send(msg)
      .then((response) => {})
      .catch((error) => {});
    return Promise.resolve();
  });
