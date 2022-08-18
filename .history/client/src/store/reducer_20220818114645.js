import { ADD_PARTICIPANT, REMOVE_PARTICIPANT, SET_USER } from "./actiontypes";

let initialState = {
  currentUser: null,
  participant: {},
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      let { payload } = action;
    }
  }
};
