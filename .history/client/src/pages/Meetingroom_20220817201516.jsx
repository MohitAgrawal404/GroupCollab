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
        participantsref.push({ username, preference: defaultPreference });
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
