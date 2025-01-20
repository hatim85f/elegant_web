import {
  EDIT_ORGANIZATION,
  GET_ORGANIZATIONS,
  GET_USER_ORGANIZATION,
} from "./organizationsActions";

const initialState = {
  organizations: [],
  userOrganization: {
    id: 0,
    organizationName: "",
    logo: "",
    industry: "",
    branches: [],
    website: "",
  },
};

export const organizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORGANIZATIONS:
      return {
        organizations: action.organizations,
      };
    case GET_USER_ORGANIZATION:
      return {
        userOrganization: action.userOrganization,
      };
    case EDIT_ORGANIZATION:
      return {
        ...state,
        organizationName: action.organizationName,
        industry: action.industry,
        website: action.website,
        logo: action.logo,
        branches: action.branches,
      };
    default:
      return state;
  }
};
