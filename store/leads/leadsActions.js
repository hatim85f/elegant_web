import { ERROR } from "../auth/authActions";
import { mainLink } from "../mainLink";

export const GET_LEADS = "GET_LEADS";
export const ADD_LEAD = "ADD_LEAD";

export const getLeads = () => {
  return async (dispatch, getState) => {
    const { user, token } = getState().auth;

    const response = await fetch(`${mainLink}/leads/main/${user._id}`, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    });

    const resData = await response.json();

    dispatch({
      type: GET_LEADS,
      leads: resData,
    });
  };
};

export const addNewLead = (
  name,
  type,
  email,
  phone,
  address,
  relatedBranch,
  source,
  assignedTo,
  status,
  notes,
  scheduledFollowupDate
) => {
  return async (dispatch, getState) => {
    const { user, token } = getState().auth;

    console.log({
      name,
      type,
      email,
      phone,
      address,
      relatedBranch,
      source,
      assignedTo,
      status,
      notes,
      scheduledFollowupDate,
    });

    const response = await fetch(`${mainLink}/leads/create/${user._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({
        name,
        type,
        email,
        phone,
        address,
        relatedBranch,
        source,
        assignedTo,
        status,
        notes,
        scheduledFollowupDate,
      }),
    });

    const resData = await response.json();

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Done",
      errorMessage: resData.message,
    });

    dispatch({
      type: ADD_LEAD,
      lead: resData.lead,
    });
  };
};
