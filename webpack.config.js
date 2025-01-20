const path = require("path");

module.exports = {
  // Other webpack configurations...
  resolve: {
    alias: {
      "react-native$": "react-native-web",
      "react-native/Libraries/NewAppScreen/components/DebugInstructions":
        path.resolve(__dirname, "./src/mocks/DebugInstructions.js"),
    },
  },
};
