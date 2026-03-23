import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (config) => {
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@aurora-demo/ui": path.resolve(__dirname, "../src"),
    };

    // Wire up Tailwind CSS v4 PostCSS plugin for Storybook
    config.css = config.css ?? {};
    config.css.postcss = {
      plugins: [
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        require("@tailwindcss/postcss"),
      ],
    };

    return config;
  },
};

export default config;
