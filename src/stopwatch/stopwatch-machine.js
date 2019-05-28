import * as XState from "xstate";

import { createLapEntry } from "./createLapEntry";

export const stopwatchMachine = XState.Machine(
  {
    id: "TimerMachine",
    initial: "idle",
    context: {
      time: 0,
      laps: [],
      startTime: 0
    },
    states: {
      idle: {
        onEntry: "reset",
        on: {
          START: {
            target: "ticking",
            actions: "saveStartTime"
          }
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
          PAUSE: {
            target: "paused",
            actions: "resetStartTime"
          },
          CANCEL: "idle",
          RESTORE: {
            actions: "recalculateTime"
          }
        }
      },
      paused: {
        on: {
          RESUME: {
            target: "ticking",
            actions: "saveStartTime"
          },
          CANCEL: "idle"
        }
      }
    }
  },
  {
    actions: {
      reset: XState.assign({ time: 0, laps: [], time: 0 }),

      saveStartTime: XState.assign({
        startTime: Date.now()
      }),

      resetStartTime: XState.assign({
        startTime: 0
      }),

      increaseTime: XState.assign({
        time: ctx => ctx.time + 1
      }),

      addLap: XState.assign({
        laps: ctx => [
          createLapEntry(ctx.time, ctx.laps.length + 1),
          ...ctx.laps
        ]
      }),

      recalculateTime: XState.assign({
        time: ({ time, startTime }) => {
          const now = Date.now();

          return Math.floor((now - startTime) / 100);
        }
      })
    }
  }
);
