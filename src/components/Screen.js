import React from "react";
import RN from "react-native";

import { colors } from "../theme";

export const Screen = props => <RN.View style={styles.container} {...props} />;

const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black
  }
});
