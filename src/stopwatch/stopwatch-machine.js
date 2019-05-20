import * as XState from "xstate";

import { createLapEntry } from "./createLapEntry";

export const stopwatchMachine = XState.Machine(
  {
    id: "TimerMachine",
    initial: "idle",
    context: {
      time: 0,
      laps: []
    },
    states: {
      idle: {
        onEntry: "reset",
        on: {
          START: "ticking"
        }
      },
      ticking: {
        invoke: {
          id: "tickingInterval",
          src: () => callback => {
            const id = setInterval(() => callback("TICK"), 1);

            return () => clearInterval(id);
          }
        },
        on: {
          TICK: { actions: "increaseTime" },
          LAP: { actions: "addLap" },
          PAUSE: "paused",
          CANCEL: "idle"
        }
      },
      paused: {
        on: {
          RESUME: "ticking",
          CANCEL: "idle"
        }
      }
    }
  },
  {
    actions: {
      reset: XState.assign({ time: 0, laps: [] }),

      increaseTime: XState.assign({
        time: ctx => ctx.time + 1
      }),

      addLap: XState.assign({
        laps: ctx => [
          createLapEntry(ctx.time, ctx.laps.length + 1),
          ...ctx.laps
        ]
      })
    }
  }
);
