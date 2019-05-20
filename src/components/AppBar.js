import React from "react";
import RN from "react-native";
import DeviceInfo from "react-native-device-info";

import { colors } from "../theme";

export function AppBar({ children }) {
  return (
    <RN.View style={styles.header}>
      <RN.Text style={styles.headerText}>{children}</RN.Text>
    </RN.View>
  );
}

const styles = RN.StyleSheet.create({
  header: {
    backgroundColor: colors.gray,
    width: "100%",
    height: DeviceInfo.hasNotch() ? 85 : 70,
    alignItems: "center",
    justifyContent: "center"
  },
  headerText: {
    color: colors.primaryText,
    fontSize: 16,
    fontWeight: "bold",
    position: "relative",
    top: DeviceInfo.hasNotch() ? 16 : 8
  }
});
