import React from "react";
import RN from "react-native";

import { colors } from "../theme";

function StartButton({ children, ...rest }) {
  return (
    <RN.TouchableHighlight style={styles.buttonLayout} {...rest}>
      <RN.View style={[styles.outerButton, styles.startButton]}>
        <RN.View style={[styles.innerButton, styles.startButton]}>
          <RN.Text style={[styles.buttonText, styles.startButtonText]}>
            {children}
          </RN.Text>
        </RN.View>
      </RN.View>
    </RN.TouchableHighlight>
  );
}

function NormalButton({ children, ...rest }) {
  return (
    <RN.TouchableHighlight style={styles.buttonLayout} {...rest}>
      <RN.View style={styles.outerButton}>
        <RN.View style={styles.innerButton}>
          <RN.Text style={styles.buttonText}>{children}</RN.Text>
        </RN.View>
      </RN.View>
    </RN.TouchableHighlight>
  );
}

function PauseButton({ children, ...rest }) {
  return (
    <RN.TouchableHighlight style={styles.buttonLayout} {...rest}>
      <RN.View style={[styles.outerButton, styles.pauseButton]}>
        <RN.View style={[styles.innerButton, styles.pauseButton]}>
          <RN.Text style={[styles.buttonText, styles.pauseButtonText]}>
            {children}
          </RN.Text>
        </RN.View>
      </RN.View>
    </RN.TouchableHighlight>
  );
}

function StopButton({ children, ...rest }) {
  return (
    <RN.TouchableHighlight style={styles.buttonLayout} {...rest}>
      <RN.View style={[styles.outerButton, styles.stopButton]}>
        <RN.View style={[styles.innerButton, styles.stopButton]}>
          <RN.Text style={[styles.buttonText, styles.stopButtonText]}>
            {children}
          </RN.Text>
        </RN.View>
      </RN.View>
    </RN.TouchableHighlight>
  );
}

export function Button({ type, ...rest }) {
  switch (type) {
    case "normal":
      return <NormalButton {...rest} />;

    case "pause":
      return <PauseButton {...rest} />;

    case "stop":
      return <StopButton {...rest} />;

    case "start":
      return <StartButton {...rest} />;
  }
}

Button.defaultProps = {
  type: "normal"
};

const styles = RN.StyleSheet.create({
  buttonLayout: {
    height: 80,
    width: 80,
    borderRadius: 50
  },
  outerButton: {
    backgroundColor: colors.gray,
    borderRadius: 50,
    padding: 2,
    flex: 1
  },
  innerButton: {
    backgroundColor: colors.gray,
    borderRadius: 50,
    flex: 1,
    borderWidth: 2,
    borderColor: colors.black,
    borderStyle: "solid",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  startButton: {
    backgroundColor: colors.green
  },
  startButtonText: {
    color: colors.lightGreen
  },
  buttonText: {
    color: colors.primaryText,
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "Damascus"
  },
  pauseButton: {
    backgroundColor: colors.yellow
  },
  pauseButtonText: {
    color: colors.lightYellow
  },
  stopButton: {
    backgroundColor: colors.red
  },
  stopButtonText: {
    color: colors.lightRed
  }
});
