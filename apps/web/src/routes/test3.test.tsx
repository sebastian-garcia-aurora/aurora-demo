import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Test3Page } from "./test3";

describe("Test3Page", () => {
  it("renders 'Page3' heading", () => {
    render(<Test3Page />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Page3",
    );
  });

  it("renders 'Page3' text visibly", () => {
    render(<Test3Page />);
    expect(screen.getByText("Page3")).toBeInTheDocument();
  });
});
