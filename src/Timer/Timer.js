import React from "react";
import RN from "react-native";
import * as XState from "xstate";

import { TimerDisplay } from "./TimerDisplay";
import { TimerControls } from "./TimerControls";
import { timerMachine } from "./timer-machine";

export class Timer extends React.Component {
  state = {
    current: timerMachine.initialState
  };

  service = XState.interpret(timerMachine).onTransition(current =>
    this.setState({ current })
  );

  componentDidMount() {
    this.service.start();
  }

  componentWillUnmount() {
    this.service.stop();
  }

  render() {
    const { send } = this.service;
    const { current } = this.state;

    return (
      <RN.View style={styles.container}>
        <TimerDisplay time={current.context.time} />

        <TimerControls
          current={current}
          onStart={() => send("START")}
          onCancel={() => send("CANCEL")}
          onPause={() => send("PAUSE")}
          onResume={() => send("RESUME")}
          onLap={() => send("LAP")}
          laps={current.context.laps}
          time={current.context.time}
        />
      </RN.View>
    );
  }
}

const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
