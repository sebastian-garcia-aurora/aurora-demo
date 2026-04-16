import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Test2Page } from "./test2";

describe("Test2Page", () => {
  it("renders 'Page 2' heading", () => {
    render(<Test2Page />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Page 2",
    );
  });

  it("renders 'Page 2' text visibly", () => {
    render(<Test2Page />);
    expect(screen.getByText("Page 2")).toBeInTheDocument();
  });
});
