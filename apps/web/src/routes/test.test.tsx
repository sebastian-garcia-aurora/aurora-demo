import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TestPage } from "./test";

describe("TestPage", () => {
  it("renders an h1 with the text 'Claude did this'", () => {
    render(<TestPage />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Claude did this");
  });
});
