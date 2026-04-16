import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Test4Page } from "./test4";

describe("Test4Page", () => {
  it("renders 'Page 4' heading", () => {
    render(<Test4Page />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Page 4",
    );
  });

  it("renders 'Page 4' text visibly", () => {
    render(<Test4Page />);
    expect(screen.getByText("Page 4")).toBeInTheDocument();
  });
});
