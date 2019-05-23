import * as XState from "xstate";

import { schedule } from "../notifications.service";

export const timerMachine = XState.Machine(
  {
    id: "TimerMachine",
    initial: "idle",
    context: {
      hours: 0,
      minutes: 0,
      seconds: 0,
      time: 0
    },
    states: {
      idle: {
        onEntry: "reset",
        on: {
          START: "countingDown",
          HOURS_SET: {
            actions: ["addHours", "recalculateTime"]
          },
          MINUTES_SET: {
            actions: ["addMinutes", "recalculateTime"]
          },
          SECONDS_SET: {
            actions: ["addSeconds", "recalculateTime"]
          }
        },
        onExit: "adjustTime"
      },
      countingDown: {
        invoke: {
          id: "countdownInterval",
          src: () => callback => {
            const id = setInterval(() => callback("TICK"), 1000);

            return () => clearInterval(id);
          }
        },
        onEntry: "setupAlarm",
        on: {
          TICK: [
            {
              target: "idle",
              cond: "outOfTime"
            },
            {
              actions: "decreaseTime"
            }
          ],
          PAUSE: "paused",
          CANCEL: "idle"
        }
      },
      paused: {
        on: {
          RESUME: "countingDown",
          CANCEL: "idle"
        }
      }
    }
  },
  {
    guards: {
      outOfTime: ctx => ctx.time === 0
    },
    actions: {
      reset: XState.assign({
        hours: 0,
        minutes: 0,
        seconds: 0
      }),

      recalculateTime: XState.assign({
        time: ({ hours, minutes, seconds }) =>
          hours * 3600 + minutes * 60 + seconds
      }),

      addHours: XState.assign({
        hours: (_, e) => e.data
      }),

      addMinutes: XState.assign({
        minutes: (_, e) => e.data
      }),

      addSeconds: XState.assign({
        seconds: (_, e) => e.data
      }),

      decreaseTime: XState.assign({
        time: ({ time }) => time - 1
      }),

      adjustTime: XState.assign({
        hours: ({ time, hours }) => (time === 0 ? 3600 : hours),
        time: ({ time }) => (time === 0 ? 3600 : time)
      }),

      setupAlarm: ({ time }) =>
        schedule({
          title: "Clock",
          message: "Time's up!",
          timeInSeconds: time === 0 ? 3600 : time
        })
    }
  }
);
