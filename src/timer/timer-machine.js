import * as XState from "xstate";

import { schedule, cancel } from "../notifications.service";

export const timerMachine = XState.Machine(
  {
    id: "TimerMachine",
    initial: "idle",
    context: {
      hours: 0,
      minutes: 0,
      seconds: 0,
      time: 0,
      alarmTime: 0
    },
    states: {
      idle: {
        onEntry: "reset",
        on: {
          START: {
            target: "countingDown",
            actions: ["setupAlarm", "saveAlarmTime"]
          },
          HOURS_SET: {
            actions: ["addHours", "recalculateTime"]
          },
          MINUTES_SET: {
            actions: ["addMinutes", "recalculateTime"]
          },
          SECONDS_SET: {
            actions: ["addSeconds", "recalculateTime"]
          },
          RESTORE_FROM_CLOSURE: [
            {
              target: "",
              cond: (_, e) => e.data.previousState === "idle",
              actions: ["restoreHoursMinutesAndSeconds", "recalculateTime"]
            },
            {
              target: "countingDown",
              cond: (_, e) => e.data.previousState === "countingDown",
              actions: ["restoreHoursMinutesAndSeconds", "restoreCountdown"]
            },
            {
              target: "paused",
              cond: (_, e) => e.data.previousState === "paused",
              actions: ["restoreHoursMinutesAndSeconds", "restoreTime"]
            }
          ]
        },
        onExit: "adjustTimeIfNoSelection"
      },
      countingDown: {
        invoke: {
          id: "countdownInterval",
          src: () => callback => {
            const id = setInterval(() => callback("TICK"), 1000);

            return () => clearInterval(id);
          }
        },
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
          PAUSE: {
            target: "paused",
            actions: "cancel"
          },
          CANCEL: {
            target: "idle",
            actions: "cancel"
          },
          RESTORE: {
            actions: "recalculateCountdown"
          }
        }
      },
      paused: {
        on: {
          RESUME: {
            target: "countingDown",
            actions: "setupAlarm"
          },
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

      adjustTimeIfNoSelection: XState.assign({
        hours: ({ time, hours }) => (time === 0 ? 3600 : hours),
        time: ({ time }) => (time === 0 ? 3600 : time)
      }),

      setupAlarm: ({ time }) =>
        schedule({
          title: "Clock",
          message: "Time's up!",
          timeInSeconds: time === 0 ? 3600 : time
        }),

      saveAlarmTime: XState.assign({
        alarmTime: ({ time }) => Date.now() + time * 1000
      }),

      cancel,

      restoreHoursMinutesAndSeconds: XState.assign({
        hours: (_, e) => e.data.hours,
        minutes: (_, e) => e.data.minutes,
        seconds: (_, e) => e.data.seconds
      }),

      restoreTime: XState.assign({
        time: (_, e) => e.data.time
      }),

      recalculateCountdown: XState.assign({
        time: ({ alarmTime }) => {
          const now = Date.now();

          return Math.floor((new Date(alarmTime) - new Date(now)) / 1000);
        }
      }),

      restoreCountdown: XState.assign({
        time: (_, { data: { alarmTime } }) => {
          const now = Date.now();

          return Math.floor((new Date(alarmTime) - new Date(now)) / 1000);
        }
      })
    }
  }
);
