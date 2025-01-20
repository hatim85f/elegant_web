import { GET_DASHBOARD_DATA } from "./dashboardActions";

const initialState = {
  latestClient: null,
  activeClientsNumber: 0,
  totalClientsNumber: 0,
};

export const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DASHBOARD_DATA:
      return {
        ...state,
        latestClient: action.latestClient,
        activeClientsNumber: action.activeClientsNumber,
        totalClientsNumber: action.totalClientsNumber,
      };
    default:
      return state;
  }
};
