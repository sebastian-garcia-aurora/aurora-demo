import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { TestPage } from "./test";

describe("TestPage", () => {
  it("renders 'Hello Multica!' heading on load", () => {
    render(<TestPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Hello Multica!",
    );
  });

  it("renders a 'Hello' button", () => {
    render(<TestPage />);
    expect(
      screen.getByRole("button", { name: "Hello" }),
    ).toBeInTheDocument();
  });

  it("does not show 'Hello Seba' before button is clicked", () => {
    render(<TestPage />);
    expect(screen.queryByText("Hello Seba")).not.toBeInTheDocument();
  });

  it("shows 'Hello Seba' after clicking the button", async () => {
    const user = userEvent.setup();
    render(<TestPage />);
    await user.click(screen.getByRole("button", { name: "Hello" }));
    expect(screen.getByText("Hello Seba")).toBeInTheDocument();
  });

  it("keeps showing 'Hello Seba' on multiple button clicks", async () => {
    const user = userEvent.setup();
    render(<TestPage />);
    const button = screen.getByRole("button", { name: "Hello" });
    await user.click(button);
    await user.click(button);
    await user.click(button);
    expect(screen.getByText("Hello Seba")).toBeInTheDocument();
  });
});
