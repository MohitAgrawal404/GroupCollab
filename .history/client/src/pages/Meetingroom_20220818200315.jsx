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

function Meetingroom(props) {
  const participantsref = dbref.child("participants");
  useEffect(() => {
    connectedref.on("value", (snap) => {
      if (snap.val()) {
        const defaultPreference = { audio: true, video: false, screen: false };
        const userRef = participantsref.push({
          username,
          preference: defaultPreference,
        });
        props.setUser({
          [userRef.key]: {
            username,
            ...defaultPreference,
          },
        });
        userRef.onDisconnect().remove();
      }
    });
  }, []);
  useEffect(() => {
    if (props.user) {
      participantsref.on("child_added", (snap) => {
        const { username, preference } = snap.val();
        props.addParticipant({ [snap.key]: { username, ...preference } });
      });
      participantsref.on("child_removed", (snap) => {
        props.removeParticipant(snap.key);
      });
    }
  }, [props.user]);

  return (
    <div>
      {/* <Videochat /> */}
      {JSON.stringify(props.user)}
      {JSON.stringify(props.participant)}
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
    addParticipant: (participant) => dispatch(addParticipant(participant)),
    removeParticipant: (participantKey) =>
      dispatch(removeParticipant(participantKey)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Meetingroom);
