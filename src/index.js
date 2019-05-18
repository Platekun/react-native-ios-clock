import { createBottomTabNavigator, createAppContainer } from "react-navigation";

import { Timer } from "./timer";
import { Stopwatch } from "./stopwatch";

const TabNavigator = createBottomTabNavigator({
  Stopwatch,
  Timer
});

export const Features = createAppContainer(TabNavigator);
