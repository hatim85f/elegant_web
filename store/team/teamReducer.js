import { ADD_TEAM_MEMBER, GET_MANAGERS, GET_TEAM } from "./teamActions";

const initialState = {
  team: [],
  managers: [],
};

export const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TEAM_MEMBER:
      return {
        ...state,
        team: [...state.team, action.member],
      };
    case GET_MANAGERS:
      return {
        ...state,
        managers: action.managers,
      };
    case GET_TEAM:
      return {
        ...state,
        team: action.team,
      };
    default:
      return state;
  }
};
