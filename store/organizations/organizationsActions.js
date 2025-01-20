import { ERROR } from "../auth/authActions";
import { mainLink } from "../mainLink";

export const GET_ORGANIZATIONS = "GET_ORGANIZATIONS";
export const GET_USER_ORGANIZATION = "GET_USER_ORGANIZATION";
export const EDIT_ORGANIZATION = "EDIT_ORGANIZATION";
export const GET_BRANCHES = "GET_BRANCHES";

export const getOrganizations = () => {
  return async (dispatch) => {
    const response = await fetch(`${mainLink}/organizations`);

    const resData = await response.json();

    if (resData.error) {
      dispatch({
        type: ERROR,
        error: resData.error,
        errorMessage: resData.message,
      });
    } else {
      dispatch({
        type: GET_ORGANIZATIONS,
        organizations: resData.organizations,
      });
    }
  };
};

export const getUserOrganization = () => {
  return async (dispatch, getState) => {
    const { user, token } = getState().auth;

    const response = await fetch(`${mainLink}/organizations/${user._id}`, {
      headers: {
        "x-auth-token": token,
      },
    });

    const resData = await response.json();

    if (resData.error) {
      dispatch({
        type: ERROR,
        error: resData.error,
        errorMessage: resData.message,
      });
    } else {
      dispatch({
        type: GET_USER_ORGANIZATION,
        userOrganization: resData.organization,
      });
    }
  };
};

export const editOrganization = (
  organizationId,
  organizationName,
  industry,
  website,
  logo,
  branches,
  address
) => {
  return async (dispatch, getState) => {
    const { user, token } = getState().auth;

    const response = await fetch(
      `${mainLink}/organizations/${user._id}/${organizationId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({
          organizationName,
          industry,
          website,
          logo,
          branches,
          address,
        }),
      }
    );

    const resData = await response.json();

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Done",
      errorMessage: resData.message,
    });

    dispatch({
      type: EDIT_ORGANIZATION,
      organizationName,
      industry,
      website,
      logo,
      branches,
    });
  };
};

export const getBranches = () => {
  return async (dispatch, getState) => {
    const { user, token } = getState().auth;

    const response = await fetch(`${mainLink}/barnches/${user._id}`, {
      headers: {
        "x-auth-token": token,
      },
    });

    const resData = await response.json();

    dispatch({
      type: GET_BRANCHES,
      branches: resData,
    });
  };
};
