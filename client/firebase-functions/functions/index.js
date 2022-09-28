const functions = require("firebase-functions");
const sgMail = require("@sendgrid/mail");
const fetch = require("cross-fetch");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

sgMail.setApiKey(
  "Enter Sendgrid api key"
);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const API_KEY =
  "Enter whereby api key";
const data = {
  endDate: "2099-02-18T14:23:00.000Z",
  fields: ["hostRoomUrl"],
};

const listAllUsers = (nextPageToken) => {
  // List batch of users, 1000 at a time.
  getAuth()
    .listUsers(1000, nextPageToken)
    .then((listUsersResult) => {
      listUsersResult.users.forEach((userRecord) => {
        console.log("user", userRecord.toJSON());
      });
      if (listUsersResult.pageToken) {
        // List next batch of users.
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
    // return event.data.ref.set('world!').then(() => {
    //     console.log('Write succeeded!');
    //   });

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

//   ....
//await onCreate();
exports.ev = functions.firestore
  .document("event/{eventId}")
  .onUpdate((change, context) => {
    console.log("Event added: ", change.after.data());
    let meetingRoom = "";

    // const order = {
    //   orderID: "E2H45JW COMPARE TO",
    //   token: "dsafdsafdsafdsafasf",
    // };
    console.log("CHECKING");
    console.log(change.after.data().roomUrl);

    const msg = {
      to: "victorjosuepimentel21@gmail.com", // Change to your recipient
      from: "mohammadnayeem2000@gmail.com", // Change to your verified sender
      subject: "Test Email",
      text: `Your group has scheduled a video chat from ${
        change.after.data().startTime
      } to ${
        change.after.data().endTime
      }. Click the link to join the meeting: ${change.after.data().roomUrl}.`,
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
