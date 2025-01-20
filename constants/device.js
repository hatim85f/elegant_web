import { Dimensions, Platform } from "react-native";

// Define constants for thresholds
const TABLET_MIN_WIDTH = 600;
const TABLET_MAX_WIDTH = 960;
const WEB_MIN_WIDTH = 1025;

const { width } = Dimensions.get("window");

export const isWeb = () => Platform.OS === "web" && width >= WEB_MIN_WIDTH;

export const isTablet = () =>
  width >= TABLET_MIN_WIDTH &&
  // width < TABLET_MAX_WIDTH &&
  width < WEB_MIN_WIDTH &&
  Platform.OS === "web";

export const isPhone = () => width < TABLET_MIN_WIDTH && Platform.OS === "web";
