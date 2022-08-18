import React from "react";
import Videochat from "../component/Videochat";
import dbref, { username, connectedref } from "../backend/room";
import { useEffect } from "react";

export const Meetingroom = () => {
  useEffect(() => {
    const participantsref = dbref;
    connectedref.on("value", (snap) => {
      if (snap.val()) {
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
