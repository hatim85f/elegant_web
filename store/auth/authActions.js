import AsyncStorage from "@react-native-async-storage/async-storage";
import { mainLink } from "../mainLink";

export const ERROR = "ERROR";
export const CLEAR_ERROR = "CLEAR_ERROR";
export const LOGIN_USER = "LOGIN_USER";
export const EDIT_USER = "EDIT_USER";
export const REGISTER_USER = "REGISTER_USER";

export const setError = (error, errorMessage) => {
  return async (dispatch) => {
    dispatch({
      type: ERROR,
      error: error,
      errorMessage: errorMessage,
    });
  };
};

export const clearError = () => {
  return async (dispatch) => {
    dispatch({
      type: CLEAR_ERROR,
      error: "",
      errorMessage: "",
    });
  };
};

export const getUserIn = (user, token) => {
  return async (dispatch) => {
    dispatch({
      type: LOGIN_USER,
      user: user,
      token: token,
    });
  };
};

export const loginUser = (userName, password, rememberChecked) => {
  return async (dispatch) => {
    const response = await fetch(`${mainLink}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        password,
      }),
    });

    const resData = await response.json();

    if (resData.error) {
      dispatch({
        type: ERROR,
        error: resData.error,
        errorMessage: resData.message,
      });
    }

    const { user, token } = await resData;

    const userDetails = {
      user: user,
      token: token,
    };

    if (rememberChecked) {
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
    }

    dispatch({
      type: LOGIN_USER,
      user: resData.user,
      token: resData.token,
    });
  };
};

export const registerUser = (
  firstName,
  lastName,
  userName,
  password,
  organizationName
) => {
  return async (dispatch) => {
    const response = await fetch(`${mainLink}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        userName,
        password,
        organizationName,
      }),
    });
    const resData = await response.json();
    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Done",
      errorMessage: resData.message,
    });
    const { user, token } = await resData;
    const userDetails = {
      user: user,
      token: token,
    };
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
    dispatch({
      type: LOGIN_USER,
      user: resData.user,
      token: resData.token,
    });
  };
};

export const editUser = (
  avatar,
  firstName,
  lastName,
  phoneNumber,
  email,
  department,
  officeLocation,
  facebook,
  x,
  linkedin,
  instagram
) => {
  return async (dispatch, getState) => {
    const { user, token } = getState().auth;

    const response = await fetch(`${mainLink}/auth/${user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({
        avatar,
        firstName,
        lastName,
        phoneNumber,
        email,
        department,
        officeLocation,
        facebook,
        x,
        linkedin,
        instagram,
      }),
    });

    const resData = await response.json();

    const newUserDetails = {
      user: resData.user,
      token,
    };

    localStorage.setItem("userDetails", JSON.stringify(newUserDetails));

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Done",
      errorMessage: resData.message,
    });

    dispatch({
      type: EDIT_USER,
      user: {
        ...user,
        firstName,
        lastName,
        userName: email,
        email,
        department,
        officeLocation,
        profile: {
          firstName,
          lastName,
          phone: phoneNumber,
          avatar,
        },
        social: {
          facebook,
          x,
          linkedin,
          instagram,
        },
      },
    });
  };
};

export const logOut = () => {
  return async (dispatch) => {
    localStorage.removeItem("userDetails");
    dispatch({
      type: LOGIN_USER,
      user: null,
      token: null,
    });
  };
};
