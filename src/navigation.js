import React from "react";
import RN from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";

import { colors } from "./theme";
import { Timer } from "./timer";
import { Stopwatch } from "./stopwatch";

function getTabBarIcon(routeName, tintColor) {
  const iconName = {
    Stopwatch: {
      ios: "ios-stopwatch",
      android: "md-stopwatch"
    },
    Timer: {
      ios: "ios-timer",
      android: "md-stopwatch"
    }
  }[routeName][RN.Platform.OS];

  return <Ionicons name={iconName} size={25} color={tintColor} />;
}

const TabNavigator = createBottomTabNavigator(
  {
    Stopwatch,
    Timer
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) =>
        getTabBarIcon(navigation.state.routeName, tintColor)
    }),
    tabBarOptions: {
      activeTintColor: colors.accent,
      inactiveTintColor: colors.lightGray,
      style: {
        backgroundColor: colors.black
      }
    }
  }
);

export const Root = createAppContainer(TabNavigator);
