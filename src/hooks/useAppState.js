import React, { useEffect } from "react";
import { AppState } from "react-native";

const currentState = AppState.currentState;

export function useAppState() {
  const [appState, setAppState] = React.useState(currentState);

  function onChange(newState) {
    setAppState(newState);
  }

  useEffect(() => {
    AppState.addEventListener("change", onChange);

    return () => {
      AppState.removeEventListener("change", onChange);
    };
  });

  return appState;
}
