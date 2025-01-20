import { CLEAR_ERROR, EDIT_USER, ERROR, LOGIN_USER } from "./authActions";

const initialState = {
  user: null,
  token: "",
  error: "",
  errorMessage: "",
  showError: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ERROR:
      return {
        ...state,
        error: action.error,
        errorMessage: action.errorMessage,
        showError: true,
      };
    case EDIT_USER:
      const newProfile = action.user.profile;

      const newUserSocials = action.user.social;

      const updatedUser = {
        ...state.user,
        firstName: action.user.firstName,
        lastName: action.user.lastName,
        email: action.user.email,
        department: action.user.department,
        officeLocation: action.user.officeLocation,
        profile: {
          ...state.user.profile,
          avatar: newProfile.avatar,
          firstName: newProfile.firstName,
          lastName: newProfile.lastName,
          phone: newProfile.phoneNumber,
        },
        socail: {
          ...state.user.social,
          facebook: newUserSocials.facebook,
          x: newUserSocials.x,
          linkedin: newUserSocials.linkedin,
          instagram: newUserSocials.instagram,
        },
      };
      return {
        ...state,
        user: updatedUser,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: "",
        errorMessage: "",
        showError: false,
      };
    case LOGIN_USER:
      return {
        ...state,
        user: action.user,
        token: action.token,
      };
    default:
      return state;
  }
};
