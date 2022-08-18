import React from "react";
import Videochat from "../component/Videochat";
import dbref, { username, connectedref } from "../backend/room";
import { useEffect } from "react";
import { auth } from "../backend/firebase";
import { connect } from "react-redux";
import {
  setUser,
  addParticipant,
  removeParticipant,
} from "../store/actioncreator";

function Meetingroom() {
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
}

const mapStateToProps = (state) => {
  return {
    user: state.currentUser,
    participants: state.participants,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch(setUser(user)),
    setUser: (user) => dispatch(addParticipant(user)),
    setUser: (user) => dispatch(removeParticipant(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Meetingroom);
