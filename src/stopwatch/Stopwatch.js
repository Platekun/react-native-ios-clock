import React from "react";
import { useMachine } from "@xstate/react";

import { Screen, AppBar } from "../components";
import { StopwatchTime } from "./StopwatchTime";
import { StopwatchControls } from "./StopwatchControls";
import { stopwatchMachine } from "./stopwatch-machine";
import { useAppState } from "../hooks";

async function onAppStateChanged({ appState, previousAppState, send }) {
  const cameFromBackground =
    previousAppState === "background" && appState === "active";

  if (cameFromBackground) {
    send("RESTORE");
  }
}

export function Stopwatch() {
  const appState = useAppState();
  const [previousAppState, setPreviousAppState] = React.useState(appState);
  const [current, send] = useMachine(stopwatchMachine);
  const { laps, time } = current.context;

  React.useEffect(() => {
    onAppStateChanged({
      appState,
      previousAppState,
      send
    });

    setPreviousAppState(appState);
  }, [appState]);

  return (
    <Screen>
      <AppBar>Stopwatch</AppBar>

      <StopwatchTime time={time} />

      <StopwatchControls
        current={current}
        onStart={() => send("START")}
        onCancel={() => send("CANCEL")}
        onPause={() => send("PAUSE")}
        onResume={() => send("RESUME")}
        onLap={() => send("LAP")}
        laps={laps}
        time={time}
      />
    </Screen>
  );
}
