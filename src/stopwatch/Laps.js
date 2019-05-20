import React from "react";
import RN from "react-native";

import { colors } from "../theme";
import { formatToStopwatchTime } from "../utils";
import { createLapEntry } from "./createLapEntry";

export function Laps({ currentTime, laps }) {
  return (
    <RN.FlatList
      data={[createLapEntry(currentTime, laps.length + 1), ...laps]}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <RN.View style={styles.lapItem}>
          <RN.Text style={styles.lapText}>Lap {item.lapNumber}</RN.Text>
          <RN.Text style={styles.lapText}>
            {formatToStopwatchTime(item.time)}
          </RN.Text>
        </RN.View>
      )}
      style={styles.list}
    />
  );
}

const styles = RN.StyleSheet.create({
  list: {
    marginTop: 16
  },
  lapItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: colors.gray,
    paddingVertical: 16
  },
  lapText: {
    color: colors.primaryText,
    fontSize: 16
  }
});
