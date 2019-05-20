import React from "react";
import * as XState from "xstate";

import { Screen, AppBar } from "../components";
import { StopwatchTime } from "./StopwatchTime";
import { StopwatchControls } from "./StopwatchControls";
import { stopwatchMachine } from "./stopwatch-machine";

export class Stopwatch extends React.Component {
  state = {
    current: stopwatchMachine.initialState
  };

  service = XState.interpret(stopwatchMachine).onTransition(current =>
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
      <Screen>
        <AppBar>Stopwatch</AppBar>

        <StopwatchTime time={current.context.time} />

        <StopwatchControls
          current={current}
          onStart={() => send("START")}
          onCancel={() => send("CANCEL")}
          onPause={() => send("PAUSE")}
          onResume={() => send("RESUME")}
          onLap={() => send("LAP")}
          laps={current.context.laps}
          time={current.context.time}
        />
      </Screen>
    );
  }
}
