import { EDIT_NOTIFICATION, GET_NOTIFICATIONS } from "./notificationActions";

const initialState = {
  notifications: [],
  notificationsNumber: 0,
  unredNotifications: 0,
};

export const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.notifications,
        notificationsNumber: action.notifications.length,
        unredNotifications: action.notifications.filter(
          (a) => a.status === "unread"
        ).length,
      };
    case EDIT_NOTIFICATION:
      const updatedNotifications = state.notifications.map((a) => {
        if (a._id === action.notificationId) {
          return { ...a, status: "read" };
        }
        return a;
      });

      return {
        ...state,
        notifications: updatedNotifications,
        unredNotifications: updatedNotifications.filter(
          (a) => a.status === "unread"
        ).length,
      };
    default:
      return state;
  }
};
