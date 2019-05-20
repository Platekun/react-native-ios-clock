import React from "react";
import RN from "react-native";
import cuid from "cuid";

export function NumberPicker({
  data,
  label,
  pickerContainerStyle,
  pickerStyle,
  itemStyle,
  labelStyle,
  ...rest
}) {
  return (
    <RN.View style={[styles.hoursPickerContainer, pickerContainerStyle]}>
      <RN.Picker
        style={[styles.picker, pickerStyle]}
        {...rest}
        itemStyle={itemStyle}
      >
        {data.map(x => (
          <RN.Picker.Item key={cuid} label={x} value={x} />
        ))}
      </RN.Picker>

      <RN.Text style={[styles.label, labelStyle]}>
        {typeof label === "string" ? label : label()}
      </RN.Text>
    </RN.View>
  );
}

const styles = RN.StyleSheet.create({
  hoursPickerContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center"
  },
  picker: {
    position: "relative",
    bottom: 33
  },
  label: {
    position: "absolute",
    left: 65,
    fontSize: 18
  }
});
