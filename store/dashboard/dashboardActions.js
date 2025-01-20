import { mainLink } from "../mainLink";

export const GET_DASHBOARD_DATA = "GET_DASHBOARD_DATA";

export const getDashboard = () => {
  return async (dispatch, getState) => {
    const { user, token } = getState().auth;

    const response = await fetch(`${mainLink}/dashboard/${user._id}`, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    });

    const resData = await response.json();

    dispatch({
      type: GET_DASHBOARD_DATA,
      latestClient: resData.latestClient,
      activeClientsNumber: resData.activeClientsNumber,
      totalClientsNumber: resData.totalClientsNumber,
    });
  };
};
