import { mainLink } from "../mainLink";

export const GET_NOTIFICATIONS = "GET_NOTIFICATIONS";
export const EDIT_NOTIFICATION = "EDIT_NOTIFICATION";

export const getNotifications = () => {
  return async (dispatch, getState) => {
    const { user, token } = getState().auth;

    const response = await fetch(`${mainLink}/notifications/${user._id}`, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    });

    const resData = await response.json();

    dispatch({
      type: GET_NOTIFICATIONS,
      notifications: resData.notifications,
    });
  };
};

export const editNotification = (notificationId) => {
  return async (dispatch, getState) => {
    const { user, token } = getState().auth;

    const response = await fetch(
      `${mainLink}/notifications/${notificationId}`,
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
      type: EDIT_NOTIFICATION,
      notificationId,
    });
  };
};
