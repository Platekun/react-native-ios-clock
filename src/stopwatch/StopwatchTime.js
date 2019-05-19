import React from "react";
import RN from "react-native";

import { formatTime } from "./formatTime";

export function StopwatchTime({ time }) {
  return (
    <RN.View style={styles.time}>
      <RN.Text style={styles.timeText}>{formatTime(time)}</RN.Text>
    </RN.View>
  );
}

const styles = RN.StyleSheet.create({
  time: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 150
  },
  timeText: {
    color: "white",
    fontSize: 56,
    fontFamily: "Damascus"
  }
});
