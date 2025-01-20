import { ERROR } from "../auth/authActions";
import { mainLink } from "../mainLink";

export const ADD_SHORT_CLIENT = "ADD_SHORT_CLIENT";
export const GET_CLIENTS = "GET_CLIENTS";
export const UPDATE_CLIENT = "UPDATE_CLIENT";
export const GET_CLIENT_DETAILS = "GET_CLIENT_DETAILS";
export const UPDATE_CLIENT_FEEDBACK = "UPDATE_CLIENT_FEEDBACK";

export const getSpecificClient = (clientId) => {
  return async (dispatch, getState) => {
    const { user, token } = getState().auth;

    const response = await fetch(`${mainLink}/clients/${clientId}`, {
      headers: {
        "x-auth-token": token,
      },
    });

    const resData = await response.json();

    dispatch({
      type: GET_CLIENT_DETAILS,
      client: resData,
    });
  };
};

export const getClients = () => {
  return async (dispatch, getState) => {
    const { user, token } = getState().auth;

    const response = await fetch(`${mainLink}/clients/all/${user._id}`, {
      headers: {
        "x-auth-token": token,
      },
    });

    const resData = await response.json();

    dispatch({
      type: GET_CLIENTS,
      inActiveClients: resData.inactiveClients,
      activeClients: resData.activeClients,
    });
  };
};

export const addShortClient = (
  clientName,
  clientEmail,
  clientPhone,
  branch
) => {
  return async (dispatch, getState) => {
    const { user, token } = getState().auth;

    const response = await fetch(
      `${mainLink}/clients/add_short_client/${user._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
          "user-id": user._id,
        },
        body: JSON.stringify({
          clientName,
          clientEmail,
          clientPhone,
          branch,
        }),
      }
    );

    const resData = await response.json();

    dispatch({
      type: ERROR,
      error: resData.error ? "Done" : resData.error,
      errorMessage: resData.message,
    });

    dispatch({
      type: ADD_SHORT_CLIENT,
      client: resData.client,
    });
  };
};

export const updateClient = (
  clientName,
  clientType,
  clientEmail,
  clientPhone,
  clientAddress,
  clientIndustry,
  clientNotes,
  assignedTo,
  preferredContactMethod,
  projectName,
  projectDescription,
  projectDeadline,
  projectBudget,
  clientId,
  branch
) => {
  return async (dispatch, getState) => {
    const { user, token } = getState().auth;

    const link =
      clientId === "No Client ID"
        ? `${mainLink}/clients/full_client/${user._id}`
        : `${mainLink}/clients/full_client/${user._id}/${clientId}`;

    const method = clientId === "No Client ID" ? "POST" : "PUT";

    const response = await fetch(link, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({
        clientName,
        clientType,
        clientEmail,
        clientPhone,
        clientAddress,
        clientIndustry,
        clientNotes,
        assignedTo,
        preferredContactMethod,
        projectName,
        projectDescription,
        projectBudget,
        projectDeadline,
        branch,
      }),
    });

    const resData = await response.json();

    dispatch({
      type: ERROR,
      error: resData.error ? "Done" : resData.error,
      errorMessage: resData.message,
    });

    dispatch({
      type: clientId ? UPDATE_CLIENT : ADD_SHORT_CLIENT,
      client: resData.client,
    });
  };
};

export const updateClientFeedback = (clientId, feedback) => {
  return async (dispatch, getState) => {
    const { user, token } = getState().auth;

    const response = await fetch(
      `${mainLink}/clients/update_feedback/${user._id}/${clientId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({
          feedback,
        }),
      }
    );

    const resData = await response.json();

    dispatch({
      type: ERROR,
      error: resData.error ? "Done" : resData.error,
      errorMessage: resData.message,
    });

    dispatch({
      type: UPDATE_CLIENT_FEEDBACK,
      client: resData.client,
    });
  };
};

export const updateFeedbackSeen = (clientId) => {
  return async (dispatch, getState) => {
    const { user, token } = getState().auth;

    const response = await fetch(
      `${mainLink}/clients/update_feedback_seen/${user._id}/${clientId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      }
    );

    const resData = await response.json();

    dispatch({
      type: UPDATE_CLIENT_FEEDBACK,
      client: resData.client,
    });
  };
};
