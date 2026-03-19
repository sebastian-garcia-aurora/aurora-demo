import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HelloPage } from "./hello";

describe("HelloPage", () => {
  it("renders without crashing", () => {
    render(<HelloPage />);
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("displays the text 'Hello from Claude Agents Pipeline'", () => {
    render(<HelloPage />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Hello from Claude Agents Pipeline");
  });
});
