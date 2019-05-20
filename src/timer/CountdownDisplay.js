import React from "react";

import { formatToHHMMSS } from "../utils";
import { TimeText } from "../components";

export function CountdownDisplay({ time }) {
  return <TimeText>{formatToHHMMSS(time)}</TimeText>;
}
