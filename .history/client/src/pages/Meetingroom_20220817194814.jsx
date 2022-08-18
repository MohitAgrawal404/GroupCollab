import React from "react";
import Videochat from "../component/Videochat";
import dbref, { username } from "../backend/room";

export const Meetingroom = () => {
  return (
    <div>
      {/* <Videochat /> */}
      {username}
    </div>
  );
};
