import { ERROR } from "../auth/authActions";
import { mainLink } from "../mainLink";

export const ADD_TEAM_MEMBER = "ADD_TEAM_MEMBER";
export const GET_MANAGERS = "GET_MANAGERS";
export const GET_TEAM = "GET_TEAM";

export const getTeam = () => {
  return async (dispatch, getState) => {
    const { user, token } = getState().auth;

    const response = await fetch(`${mainLink}/teams/${user._id}`, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    });

    const resData = await response.json();

    dispatch({
      type: GET_TEAM,
      team: resData.teamMembers,
    });
  };
};

export const getManagers = () => {
  return async (dispatch, getState) => {
    const { token, user } = getState().auth;

    const response = await fetch(
      `${mainLink}/teams/managers/${user.organization}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      }
    );

    const resData = await response.json();

    dispatch({
      type: GET_MANAGERS,
      managers: resData.managers,
    });
  };
};

export const addTeamMember = (
  firstName,
  lastName,
  role,
  email,
  parentId,
  branchId
) => {
  return async (dispatch, getState) => {
    const { user, token } = getState().auth;

    const response = await fetch(`${mainLink}/auth/invite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
        "user-id": user._id,
      },
      body: JSON.stringify({
        firstName,
        lastName,
        role,
        email,
        userId: user._id,
        parentId,
        branchId,
      }),
    });

    const resData = await response.json();

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Done",
      errorMessage: resData.message,
    });

    dispatch({
      type: ADD_TEAM_MEMBER,
      member: resData.member,
    });
  };
};
