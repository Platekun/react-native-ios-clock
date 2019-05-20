import React from "react";
import RN from "react-native";

import { NumberPicker } from "../components";
import { range } from "../utils";
import { colors } from "../theme";

const HOW_MANY_HOURS = range(0, 23);
const getHoursLabel = hours => (hours === 1 ? "hour" : "hours");
function HoursPicker({ selectedValue, ...rest }) {
  return (
    <NumberPicker
      data={HOW_MANY_HOURS}
      label={getHoursLabel(selectedValue)}
      selectedValue={selectedValue}
      pickerStyle={styles.picker}
      itemStyle={styles.pickerItem}
      labelStyle={styles.pickerItem}
      {...rest}
    />
  );
}

const HOW_MANY_MINUTES = range(0, 59);
function MinutesPicker(props) {
  return (
    <NumberPicker
      data={HOW_MANY_MINUTES}
      label="min"
      pickerStyle={styles.picker}
      itemStyle={styles.pickerItem}
      labelStyle={styles.pickerItem}
      {...props}
    />
  );
}

const HOW_MANY_SECONDS = range(0, 59);
function SecondsPicker(props) {
  return (
    <NumberPicker
      data={HOW_MANY_SECONDS}
      label="sec"
      pickerStyle={styles.picker}
      itemStyle={styles.pickerItem}
      labelStyle={styles.pickerItem}
      {...props}
    />
  );
}

export function CountdownControls({
  hours,
  minutes,
  seconds,
  onSetHours,
  onSetMinutes,
  onSetSeconds
}) {
  return (
    <>
      <HoursPicker selectedValue={hours} onValueChange={onSetHours} />
      <MinutesPicker selectedValue={minutes} onValueChange={onSetMinutes} />
      <SecondsPicker selectedValue={seconds} onValueChange={onSetSeconds} />
    </>
  );
}

const styles = RN.StyleSheet.create({
  picker: {
    height: 150,
    width: 100
  },
  pickerItem: {
    color: colors.primaryText
  }
});
