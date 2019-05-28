import React from "react";
import RN from "react-native";
import { useMachine } from "@xstate/react";
import AsyncStorage from "@react-native-community/async-storage";

import { Screen, AppBar } from "../components";
import { CountdownControls } from "./CountdownControls";
import { CountdownDisplay } from "./CountdownDisplay";
import { TimerControls } from "./TimerControls";
import { timerMachine } from "./timer-machine";
import { useAppState } from "../hooks";

const TIMER_KEY_STORAGE = "@TIMER";

async function restoreIfClosed(send) {
  const stored = await AsyncStorage.getItem(TIMER_KEY_STORAGE);
  const { previousState, previousContext } = JSON.parse(stored);

  const hadSomethingSaved = !!Object.keys(previousContext);

  if (hadSomethingSaved) {
    send({
      type: "RESTORE_FROM_CLOSURE",
      data: {
        previousState,
        ...previousContext
      }
    });

    return await AsyncStorage.setItem(
      TIMER_KEY_STORAGE,
      JSON.stringify({
        previousState: null,
        previousContext: {}
      })
    );
  }
}

async function onAppStateChanged({
  appState,
  previousAppState,
  current,
  send
}) {
  const cameFromBackground =
    previousAppState === "background" && appState === "active";

  if (cameFromBackground) {
    return send("RESTORE");
  }

  const currenctlyInactive = appState === "inactive";
  if (currenctlyInactive) {
    return await AsyncStorage.setItem(
      TIMER_KEY_STORAGE,
      JSON.stringify({
        previousState: current.value,
        previousContext: current.context
      })
    );
  }
}

export function Timer() {
  const appState = useAppState();
  const [previousAppState, setPreviousAppState] = React.useState();
  const [current, send] = useMachine(timerMachine);
  const { hours, minutes, seconds, time } = current.context;

  React.useEffect(() => {
    restoreIfClosed(send);
  }, []);

  React.useEffect(() => {
    onAppStateChanged({
      appState,
      previousAppState,
      current,
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
