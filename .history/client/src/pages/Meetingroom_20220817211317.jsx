import React from "react";
import Videochat from "../component/Videochat";
import dbref, { username, connectedref } from "../backend/room";
import { useEffect } from "react";
import { auth } from "../backend/firebase";

export const Meetingroom = () => {
  // console.log(auth.currentUser.displayName);

  useEffect(() => {
    const author = { name: auth.currentUser.displayName };
    const participantsref = dbref.child("participants");
    connectedref.on("value", (snap) => {
      if (snap.val()) {
        const defaultPreference = { audio: true, video: false, screen: false };
        const userRef = participantsref.push({
          username: author.name,
          preference: defaultPreference,
        });
        userRef.onDisconnect().remove();
      }
    });
  }, []);

  return (
    <div>
      {/* <Videochat /> */}
      {username}
    </div>
  );
};
