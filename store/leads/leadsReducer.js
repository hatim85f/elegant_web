import { ADD_LEAD, GET_LEADS } from "./leadsActions";

const initialState = {
  leads: [],
};

export const leadsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LEADS:
      return {
        ...state,
        leads: action.leads,
      };
    case ADD_LEAD:
      return {
        ...state,
        leads: state.leads.concat(action.lead),
      };
    default:
      return state;
  }
};
