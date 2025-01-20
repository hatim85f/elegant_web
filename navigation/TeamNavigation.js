import { createStackNavigator } from "@react-navigation/stack";
import TeamMemberScreen, {
  TeamMemberScreenOptions,
} from "../screens/team/TeamMemberScreen";
import TeamScreen, { TeamScreenOptions } from "../screens/team/TeamScreen";

const TeamMainNavigator = createStackNavigator();

export const TeamNavigation = () => {
  return (
    <TeamMainNavigator.Navigator screenOptions={{ headerShown: false }}>
      <TeamMainNavigator.Screen
        name="team"
        component={TeamScreen}
        options={{
          title: "Team",
        }}
      />
      <TeamMainNavigator.Screen
        name="team_member"
        component={TeamMemberScreen}
        options={{
          title: "Team Member",
        }}
      />
    </TeamMainNavigator.Navigator>
  );
};
