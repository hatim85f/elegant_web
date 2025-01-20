import { createStackNavigator } from "@react-navigation/stack";
import ClientsScreen from "../screens/clients/ClientsScreen";
import ActiveClientsDetails from "../screens/clients/ActiveClientsDetails";

const MainClientsNavigator = createStackNavigator();

export const ClinetNavigator = () => {
  return (
    <MainClientsNavigator.Navigator screenOptions={{ headerShown: false }}>
      <MainClientsNavigator.Screen
        name="clients"
        component={ClientsScreen}
        options={{ title: "Clients" }}
      />
      <MainClientsNavigator.Screen
        name="client_details"
        component={ActiveClientsDetails}
        options={{ title: "Client Details" }}
      />
    </MainClientsNavigator.Navigator>
  );
};
