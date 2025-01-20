import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { authReducer } from "./auth/authReducer";
import { organizationReducer } from "./organizations/organizationReducer";
import { clientsReducer } from "./clients/clientsReducer";
import { teamReducer } from "./team/teamReducer";
import { leadsReducer } from "./leads/leadsReducer";
import { dashboardReducer } from "./dashboard/dashboardReducer";
import { notificationsReducer } from "./notifications/notificationsReducer";

const mainStore = configureStore({
  reducer: {
    auth: authReducer,
    organizations: organizationReducer,
    clients: clientsReducer,
    team: teamReducer,
    leads: leadsReducer,
    dashboard: dashboardReducer,
    notifications: notificationsReducer,
  },
});

export default mainStore;
