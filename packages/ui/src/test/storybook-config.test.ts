/**
 * QA tests for AUR-26: Storybook configuration for packages/ui
 *
 * These tests verify that the Storybook setup is correctly configured
 * and that story files are properly structured.
 */
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const UI_ROOT = path.resolve(__dirname, "../../");
const STORYBOOK_DIR = path.join(UI_ROOT, ".storybook");
const STORYBOOK_STATIC_DIR = path.join(UI_ROOT, "storybook-static");

describe("AUR-26: Storybook configuration for packages/ui", () => {
  describe("Config files exist", () => {
    it("has .storybook/main.ts", () => {
      expect(fs.existsSync(path.join(STORYBOOK_DIR, "main.ts"))).toBe(true);
    });

    it("has .storybook/preview.ts", () => {
      expect(fs.existsSync(path.join(STORYBOOK_DIR, "preview.ts"))).toBe(true);
    });
  });

  describe("main.ts configuration", () => {
    it("references stories glob pattern", () => {
      const mainContent = fs.readFileSync(
        path.join(STORYBOOK_DIR, "main.ts"),
        "utf-8"
      );
      expect(mainContent).toContain("stories");
      expect(mainContent).toContain(".stories.");
    });

    it("uses react-vite framework", () => {
      const mainContent = fs.readFileSync(
        path.join(STORYBOOK_DIR, "main.ts"),
        "utf-8"
      );
      expect(mainContent).toContain("@storybook/react-vite");
    });

    it("includes a11y addon", () => {
      const mainContent = fs.readFileSync(
        path.join(STORYBOOK_DIR, "main.ts"),
        "utf-8"
      );
      expect(mainContent).toContain("@storybook/addon-a11y");
    });

    it("includes essentials addon", () => {
      const mainContent = fs.readFileSync(
        path.join(STORYBOOK_DIR, "main.ts"),
        "utf-8"
      );
      expect(mainContent).toContain("@storybook/addon-essentials");
    });

    it("configures monorepo path alias for @aurora-demo/ui", () => {
      const mainContent = fs.readFileSync(
        path.join(STORYBOOK_DIR, "main.ts"),
        "utf-8"
      );
      expect(mainContent).toContain("@aurora-demo/ui");
    });

    it("configures Tailwind CSS v4 PostCSS plugin", () => {
      const mainContent = fs.readFileSync(
        path.join(STORYBOOK_DIR, "main.ts"),
        "utf-8"
      );
      expect(mainContent).toContain("@tailwindcss/postcss");
    });
  });

  describe("Story files", () => {
    it("has at least one story file in src", () => {
      const storyFiles: string[] = [];
      function findStories(dir: string) {
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
          const fullPath = path.join(dir, entry.name);
          if (entry.isDirectory() && entry.name !== "node_modules") {
            findStories(fullPath);
          } else if (
            entry.isFile() &&
            entry.name.match(/\.stories\.(js|jsx|ts|tsx|mdx)$/)
          ) {
            storyFiles.push(fullPath);
          }
        }
      }
      findStories(path.join(UI_ROOT, "src"));
      expect(storyFiles.length).toBeGreaterThan(0);
    });

    it("button.stories.tsx exports a default meta and named stories", () => {
      const buttonStoriesPath = path.join(
        UI_ROOT,
        "src/components/button.stories.tsx"
      );
      expect(fs.existsSync(buttonStoriesPath)).toBe(true);
      const content = fs.readFileSync(buttonStoriesPath, "utf-8");
      // Check for default export (meta)
      expect(content).toContain("export default");
      // Check for at least one named story export
      expect(content).toMatch(/^export const \w+/m);
      // Check for Storybook types
      expect(content).toContain("@storybook/react");
    });
  });

  describe("Build output", () => {
    it("storybook-static directory exists (build was run)", () => {
      expect(fs.existsSync(STORYBOOK_STATIC_DIR)).toBe(true);
    });

    it("storybook-static contains index.html", () => {
      expect(
        fs.existsSync(path.join(STORYBOOK_STATIC_DIR, "index.html"))
      ).toBe(true);
    });

    it("storybook-static contains iframe.html (stories rendered here)", () => {
      expect(
        fs.existsSync(path.join(STORYBOOK_STATIC_DIR, "iframe.html"))
      ).toBe(true);
    });

    it("storybook-static contains index.json (story index)", () => {
      expect(
        fs.existsSync(path.join(STORYBOOK_STATIC_DIR, "index.json"))
      ).toBe(true);
    });

    it("story index contains UI/Button stories", () => {
      const indexPath = path.join(STORYBOOK_STATIC_DIR, "index.json");
      const indexContent = JSON.parse(fs.readFileSync(indexPath, "utf-8"));
      const entries = Object.values(indexContent.entries ?? {}) as Array<{
        title?: string;
      }>;
      const buttonStories = entries.filter((e) => e.title === "UI/Button");
      expect(buttonStories.length).toBeGreaterThan(0);
    });
  });

  describe("Package configuration", () => {
    it("package.json has storybook script", () => {
      const pkg = JSON.parse(
        fs.readFileSync(path.join(UI_ROOT, "package.json"), "utf-8")
      );
      expect(pkg.scripts?.storybook).toBeDefined();
      expect(pkg.scripts.storybook).toContain("storybook");
    });

    it("package.json has build-storybook script", () => {
      const pkg = JSON.parse(
        fs.readFileSync(path.join(UI_ROOT, "package.json"), "utf-8")
      );
      expect(pkg.scripts?.["build-storybook"]).toBeDefined();
      expect(pkg.scripts["build-storybook"]).toContain("storybook build");
    });

    it("has @storybook/react-vite as dev dependency", () => {
      const pkg = JSON.parse(
        fs.readFileSync(path.join(UI_ROOT, "package.json"), "utf-8")
      );
      expect(pkg.devDependencies?.["@storybook/react-vite"]).toBeDefined();
    });

    it("has @storybook/addon-a11y as dev dependency", () => {
      const pkg = JSON.parse(
        fs.readFileSync(path.join(UI_ROOT, "package.json"), "utf-8")
      );
      expect(pkg.devDependencies?.["@storybook/addon-a11y"]).toBeDefined();
    });
  });
});
