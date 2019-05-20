import React from "react";
import RN from "react-native";

import { Button } from "../components";

function IdleControls({ onStart }) {
  return (
    <RN.View style={styles.buttons}>
      <Button>Cancel</Button>

      <Button type="start" onPress={onStart}>
        Start
      </Button>
    </RN.View>
  );
}

function CountingDownControls({ onPause, onCancel }) {
  return (
    <RN.View style={styles.buttons}>
      <Button onPress={onCancel}>Cancel</Button>

      <Button type="pause" onPress={onPause}>
        Pause
      </Button>
    </RN.View>
  );
}

function PausedControls({ onResume, onCancel }) {
  return (
    <RN.View style={styles.buttons}>
      <Button onPress={onCancel}>Cancel</Button>

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
  onCancel
}) {
  let controls;
  if (current.matches("idle")) {
    controls = <IdleControls onStart={onStart} />;
  }

  if (current.matches("countingDown")) {
    controls = <CountingDownControls onPause={onPause} onCancel={onCancel} />;
  }

  if (current.matches("paused")) {
    controls = <PausedControls onResume={onResume} onCancel={onCancel} />;
  }

  return <RN.View style={styles.controls}>{controls}</RN.View>;
}

const styles = RN.StyleSheet.create({
  controls: {
    flex: 3,
    width: "100%",
    padding: 50
  },
  buttons: {
    justifyContent: "space-between",
    flexDirection: "row"
  }
});
