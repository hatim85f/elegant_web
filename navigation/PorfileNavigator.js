import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/profile/ProfileScreen";
import EditProfileScreen from "../screens/profile/EditProfileScreen";

const MainProfileNavigator = createStackNavigator();

export const ProfileNavigator = () => {
  return (
    <MainProfileNavigator.Navigator
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: "push",
      }}
    >
      <MainProfileNavigator.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          title: "Profile",
        }}
      />
      <MainProfileNavigator.Screen
        name="edit_profile"
        component={EditProfileScreen}
        options={{
          headerShown: false,
          title: "Edit Profile",
        }}
      />
    </MainProfileNavigator.Navigator>
  );
};
