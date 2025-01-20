import {
  ADD_SHORT_CLIENT,
  GET_CLIENT_DETAILS,
  GET_CLIENTS,
  UPDATE_CLIENT,
  UPDATE_CLIENT_FEEDBACK,
} from "./clientsActions";

const initialState = {
  inActiveClients: [],
  activeClients: [],
  clientDetails: {},
};

export const clientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CLIENTS:
      return {
        ...state,
        inActiveClients: action.inActiveClients,
        activeClients: action.activeClients,
      };
    case GET_CLIENT_DETAILS:
      return {
        ...state,
        clientDetails: action.client,
      };
    case ADD_SHORT_CLIENT:
      return {
        ...state,
        inActiveClients: [...state.inActiveClients, action.client],
      };
    case UPDATE_CLIENT:
      const updatedClient = action.client;
      const clientIndex = state.activeClients.findIndex(
        (client) => client._id === updatedClient._id
      );
      const updatedClients = [...state.activeClients];
      updatedClients[clientIndex] = updatedClient;
      const newInActiveClients = state.inActiveClients.filter(
        (client) => client._id !== updatedClient._id
      );
    case UPDATE_CLIENT_FEEDBACK:
      const currentClientIndex = state.activeClients.findIndex(
        (client) => client._id === action.client._id
      );
      const newUpdatedClient = action.client;
      const clientsList = [...state.activeClients];

      clientsList[currentClientIndex] = newUpdatedClient;

      return {
        ...state,
        activeClients: clientsList,
      };
    default:
      return state;
  }
};
