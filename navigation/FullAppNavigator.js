import { createStackNavigator } from "@react-navigation/stack";
import { AuthNavigation } from "./AuthNavigation";
import HomeScreen from "../pages/HomeScreen";
import ProfileScreen from "../pages/profile/ProfileScreen";
import TeamScreen from "../pages/team/TeamScreen";
import EditProfileScreen from "../pages/profile/EditProfileScreen";
import { ProfileNavigator } from "./PorfileNavigator";
import { TeamNavigation } from "./TeamNavigation";
import ClientsScreen from "../pages/clients/ClientsScreen";
import AddNewClientScreen from "../pages/clients/AddNewClientScreen";
import ActiveClientsDetails from "../pages/clients/ActiveClientsDetails";
import { ClinetNavigator } from "./ClientsNavigator";
import OrganizationScreen from "../pages/organization/OrganizationScreen";
import EditOrganizationScreen from "../pages/organization/EditOrganizationScreen";
import LeadsScreen from "../pages/leads/LeadsScreen";
import NotificationsScreen from "../pages/notifications/NotificationsScreen";
import TermsAndConditions from "../pages/legal/TermsAndConditions";
import PrivacyPolicy from "../pages/legal/PrivacyPolicy";

const MainAppNavigator = createStackNavigator();

export const FullAppNavigator = () => {
  return (
    <MainAppNavigator.Navigator
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: "push",
      }}
    >
      <MainAppNavigator.Screen
        name="auth"
        component={AuthNavigation}
        options={{
          headerShown: false,
        }}
      />
      <MainAppNavigator.Screen
        name="home"
        component={HomeScreen}
        options={{
          headerShown: false,
          title: "Home",
        }}
      />
      <MainAppNavigator.Screen
        name="profile"
        component={ProfileNavigator}
        options={{
          headerShown: false,
          title: "Profile",
        }}
      />

      <MainAppNavigator.Screen
        name="team"
        component={TeamNavigation}
        options={{
          headerShown: false,
          title: "Team",
        }}
      />
      <MainAppNavigator.Screen
        name="clients"
        component={ClinetNavigator}
        options={{
          headerShown: false,
          title: "Clients",
        }}
      />
      <MainAppNavigator.Screen
        name="add_new_client"
        component={AddNewClientScreen}
        options={{
          headerShown: false,
          title: "Add New Client",
        }}
      />
      <MainAppNavigator.Screen
        name="organization"
        component={OrganizationScreen}
        options={{
          headerShown: false,
          title: "Organization",
        }}
      />
      <MainAppNavigator.Screen
        name="edit_organization"
        component={EditOrganizationScreen}
        options={{
          headerShown: false,
          title: "Organization Edit",
        }}
      />
      <MainAppNavigator.Screen
        name="leads"
        component={LeadsScreen}
        options={{
          headerShown: false,
          title: "Leads",
        }}
      />
      <MainAppNavigator.Screen
        name="notifications"
        component={NotificationsScreen}
        options={{
          headerShown: false,
          title: "Notifications",
        }}
      />
      <MainAppNavigator.Screen
        name="terms_and_conditions"
        component={TermsAndConditions}
        options={{
          headerShown: false,
          title: "Terms and Conditions",
        }}
      />
      <MainAppNavigator.Screen
        name="privacy_policy"
        component={PrivacyPolicy}
        options={{
          headerShown: false,
          title: "Privacy Policy",
        }}
      />
    </MainAppNavigator.Navigator>
  );
};
