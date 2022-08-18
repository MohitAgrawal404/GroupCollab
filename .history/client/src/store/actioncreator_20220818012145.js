import { ADD_PARTICIPANT, REMOVE_PARTICIPANT, SET_USER } from "./actiontypes";

export const setUser = (user) => {
  return { type: SET_USER, payload: { currentUser: user } };
};

export const addParticipant = (participant) => {
  return { type: ADD_PARTICIPANT, payload: { participant } };
};

export const removeParticipant = (user) => {
  return { type: SET_USER, payload: { currentUser: user } };
};
