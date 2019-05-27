import React from "react";
import RN from "react-native";
import { useMachine } from "@xstate/react";

import { Screen, AppBar } from "../components";
import { CountdownControls } from "./CountdownControls";
import { CountdownDisplay } from "./CountdownDisplay";
import { TimerControls } from "./TimerControls";
import { timerMachine } from "./timer-machine";
import { useAppState } from "../hooks";

async function onAppStateChanged({ appState, previousAppState, send }) {
  const cameFromBackground =
    previousAppState === "background" && appState === "active";

  if (cameFromBackground) {
    send("RESTORE");
  }
}

export function Timer() {
  const appState = useAppState();
  const [previousAppState, setPreviousAppState] = React.useState(appState);
  const [current, send] = useMachine(timerMachine);
  const { hours, minutes, seconds, time } = current.context;

  React.useEffect(() => {
    onAppStateChanged({
      appState,
      previousAppState,
      send
    });

    setPreviousAppState(appState);
  }, [appState]);

  const controls = (
    <TimerControls
      current={current}
      onStart={() => send("START")}
      onPause={() => send("PAUSE")}
      onResume={() => send("RESUME")}
      onCancel={() => send("CANCEL")}
    />
  );

  if (current.matches("countingDown") || current.matches("paused")) {
    return (
      <Screen>
        <AppBar>Timer</AppBar>

        <RN.View style={styles.countDownControlsAndDisplay}>
          <CountdownDisplay time={time} />
        </RN.View>

        {controls}
      </Screen>
    );
  }

  if (current.matches("idle")) {
    return (
      <Screen>
        <AppBar>Timer</AppBar>

        <RN.View style={styles.countDownControlsAndDisplay}>
          <CountdownControls
            hours={hours}
            onSetHours={data =>
              send({
                type: "HOURS_SET",
                data
              })
            }
            minutes={minutes}
            onSetMinutes={data =>
              send({
                type: "MINUTES_SET",
                data
              })
            }
            seconds={seconds}
            onSetSeconds={data =>
              send({
                type: "SECONDS_SET",
                data
              })
            }
          />
        </RN.View>

        {controls}
      </Screen>
    );
  }

  return null;
}

const styles = RN.StyleSheet.create({
  countDownControlsAndDisplay: {
    flex: 1.5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 32
  }
});
