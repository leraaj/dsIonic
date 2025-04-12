import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "io.ionic.starter",
  appName: "dsIonic",
  webDir: "dist",
  plugins: {
    StatusBar: {
      style: "dark", // or 'light' depending on your theme
      overlays: false, // Prevents content from going behind the status bar
    },
  },
};

export default config;
