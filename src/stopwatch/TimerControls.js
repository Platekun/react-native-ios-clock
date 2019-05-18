import React from "react";
import RN from "react-native";

import { colors } from "../theme";
import { Button } from "../components";
import { Laps } from "./Laps";

function IdleControls({ onStart, onCancel }) {
  return (
    <RN.View style={styles.buttons}>
      <Button onPress={onCancel}>Cancel</Button>

      <Button type="start" onPress={onStart}>
        Start
      </Button>
    </RN.View>
  );
}

function TickingControls({ onLap, onPause }) {
  return (
    <RN.View style={styles.buttons}>
      <Button onPress={onLap}>Lap</Button>

      <Button type="stop" onPress={onPause}>
        Stop
      </Button>
    </RN.View>
  );
}

function PausedControls({ onResume, onCancel }) {
  return (
    <RN.View style={styles.buttons}>
      <Button onPress={onCancel}>Reset</Button>

      <Button type="start" onPress={onResume}>
        Resume
      </Button>
    </RN.View>
  );
}

export function TimerControls({
  current,
  onStart,
  onPause,
  onResume,
  onCancel,
  onLap,
  laps,
  time
}) {
  let controls;
  if (current.matches("idle")) {
    controls = <IdleControls onStart={onStart} onCancel={onCancel} />;
  }

  if (current.matches("ticking")) {
    controls = <TickingControls onPause={onPause} onLap={onLap} />;
  }

  if (current.matches("paused")) {
    controls = <PausedControls onResume={onResume} onCancel={onCancel} />;
  }

  return (
    <RN.View style={styles.controls}>
      {controls}

      <Laps laps={laps} currentTime={time} />
    </RN.View>
  );
}

const styles = RN.StyleSheet.create({
  controls: {
    flex: 3,
    width: "100%",
    backgroundColor: colors.black,
    padding: 50
  },
  buttons: {
    justifyContent: "space-between",
    flexDirection: "row"
  }
});
