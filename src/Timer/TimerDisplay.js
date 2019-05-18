import React from "react";
import RN from "react-native";

import { colors } from "../theme";
import { formatTime } from "./formatTime";

export function TimerDisplay({ time }) {
  return (
    <RN.View style={styles.time}>
      <RN.Text style={styles.timeText}>{formatTime(time)}</RN.Text>
    </RN.View>
  );
}

const styles = RN.StyleSheet.create({
  time: {
    flex: 1,
    backgroundColor: colors.black,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 150
  },
  timeText: {
    color: "white",
    fontSize: 70,
    fontFamily: "Damascus"
  }
});
