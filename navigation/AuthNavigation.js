import { createStackNavigator } from "@react-navigation/stack";
import StartScreen from "../pages/StartScreen";
import LoginScreen from "../pages/Auth/LoginScreen";
import MobileDeliveryAuth from "../pages/Auth/MobileDeliveryAuth";
import RegisterationScreen from "../pages/Auth/RegisterationScreen";

const MainAuthNavigation = createStackNavigator();

export const AuthNavigation = () => {
  return (
    <MainAuthNavigation.Navigator>
      <MainAuthNavigation.Screen
        name="start"
        component={StartScreen}
        options={{
          title: "Welcome",
          headerShown: false,
        }}
      />
      <MainAuthNavigation.Screen
        name="login"
        component={LoginScreen}
        options={{
          title: "Login",
          headerShown: false,
        }}
      />
      <MainAuthNavigation.Screen
        name="redirect"
        component={MobileDeliveryAuth}
        options={{
          title: "Redirect",
          headerShown: false,
        }}
      />
      <MainAuthNavigation.Screen
        name="register"
        component={RegisterationScreen}
        options={{
          title: "Registeration",
          headerShown: false,
        }}
      />
    </MainAuthNavigation.Navigator>
  );
};
