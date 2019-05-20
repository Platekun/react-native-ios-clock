import React from "react";
import RN from "react-native";

import { formatToStopwatchTime } from "../utils";
import { TimeText } from "../components";

export function StopwatchTime({ time }) {
  return (
    <RN.View style={styles.time}>
      <TimeText>{formatToStopwatchTime(time)}</TimeText>
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
  }
});
