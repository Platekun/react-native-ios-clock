import React from "react";
import { useMachine } from "@xstate/react";

import { Screen, AppBar } from "../components";
import { StopwatchTime } from "./StopwatchTime";
import { StopwatchControls } from "./StopwatchControls";
import { stopwatchMachine } from "./stopwatch-machine";

export function Stopwatch() {
  const [current, send] = useMachine(stopwatchMachine);

  const { laps, time } = current.context;

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
