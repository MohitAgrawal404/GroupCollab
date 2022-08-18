import { ADD_PARTICIPANT, REMOVE_PARTICIPANT, SET_USER } from "./actiontypes";

export const setUser = (user) => {
  return { type: SET_USER, payload: { currentUser: user } };
};
