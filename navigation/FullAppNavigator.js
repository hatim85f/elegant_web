import { createStackNavigator } from "@react-navigation/stack";
import { AuthNavigation } from "./AuthNavigation";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import TeamScreen from "../screens/team/TeamScreen";
import EditProfileScreen from "../screens/profile/EditProfileScreen";
import { ProfileNavigator } from "./PorfileNavigator";
import { TeamNavigation } from "./TeamNavigation";
import ClientsScreen from "../screens/clients/ClientsScreen";
import AddNewClientScreen from "../screens/clients/AddNewClientScreen";
import ActiveClientsDetails from "../screens/clients/ActiveClientsDetails";
import { ClinetNavigator } from "./ClientsNavigator";
import OrganizationScreen from "../screens/organization/OrganizationScreen";
import EditOrganizationScreen from "../screens/organization/EditOrganizationScreen";
import LeadsScreen from "../screens/leads/LeadsScreen";
import NotificationsScreen from "../screens/notifications/NotificationsScreen";

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
    </MainAppNavigator.Navigator>
  );
};
