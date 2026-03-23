import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import type { StorybookConfig } from "@storybook/react-vite";

const uiRoot = path.resolve(__dirname, "../../../packages/ui");
const uiSrc = path.resolve(uiRoot, "src");

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal(config) {
    // Add Tailwind CSS v4 plugin
    config.plugins = [...(config.plugins ?? []), tailwindcss()];

    // Resolve monorepo path aliases
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        "@": path.resolve(__dirname, "../src"),
        // Map @aurora-demo/ui/* imports using the package src structure
        "@aurora-demo/ui/globals.css": path.resolve(uiSrc, "styles/globals.css"),
        "@aurora-demo/ui/components": path.resolve(uiSrc, "components"),
        "@aurora-demo/ui/hooks": path.resolve(uiSrc, "hooks"),
        "@aurora-demo/ui/lib": path.resolve(uiSrc, "lib"),
        "@aurora-demo/ui": uiSrc,
      },
    };

    return config;
  },
};

export default config;
