import React from "react";
import RN from "react-native";

export function TimeText(props) {
  return <RN.Text style={styles.timeText} {...props} />;
}

const styles = RN.StyleSheet.create({
  timeText: {
    color: "white",
    fontSize: 56,
    fontFamily: "Damascus"
  }
});
