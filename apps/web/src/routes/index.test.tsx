import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { HomeComponent } from "./index";

describe("HomeComponent", () => {
  it("renders the Hello Claude button", () => {
    render(<HomeComponent />);
    expect(screen.getByRole("button", { name: "Hello Claude" })).toBeInTheDocument();
  });

  it("shows 'This is working!' text when button is clicked", async () => {
    render(<HomeComponent />);
    const button = screen.getByRole("button", { name: "Hello Claude" });
    expect(screen.queryByText("This is working!")).not.toBeInTheDocument();
    await userEvent.click(button);
    expect(screen.getByText("This is working!")).toBeInTheDocument();
  });

  it("toggles text off when button is clicked again", async () => {
    render(<HomeComponent />);
    const button = screen.getByRole("button", { name: "Hello Claude" });
    await userEvent.click(button);
    expect(screen.getByText("This is working!")).toBeInTheDocument();
    await userEvent.click(button);
    expect(screen.queryByText("This is working!")).not.toBeInTheDocument();
  });

  it("does not affect existing h1 heading", () => {
    render(<HomeComponent />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Claude Starter");
  });
});
