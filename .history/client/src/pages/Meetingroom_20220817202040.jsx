import React from "react";
import Videochat from "../component/Videochat";
import dbref, { username, connectedref } from "../backend/room";
import { useEffect } from "react";

export const Meetingroom = () => {
  useEffect(() => {
    const participantsref = dbref.child("participants");
    connectedref.on("value", (snap) => {
      if (snap.val()) {
        const defaultPreference = { audio: true, video: false, screen: false };
        const userRef = participantsref.push({
          username,
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
