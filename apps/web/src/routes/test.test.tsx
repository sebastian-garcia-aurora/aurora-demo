import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { TestPage } from "./test";

describe("TestPage", () => {
  it("renders an h1 with the text 'Claude did this'", () => {
    render(<TestPage />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Claude did this");
  });

  it("renders a 'Say Hi Rob' button", () => {
    render(<TestPage />);
    const button = screen.getByRole("button", { name: /say hi rob/i });
    expect(button).toBeInTheDocument();
  });

  it("shows 'Hi Rob' in an h1 when the button is clicked", async () => {
    const user = userEvent.setup();
    render(<TestPage />);

    const button = screen.getByRole("button", { name: /say hi rob/i });
    await user.click(button);

    const hiRobHeading = screen.getByRole("heading", { name: /hi rob/i });
    expect(hiRobHeading).toBeInTheDocument();
    expect(hiRobHeading.tagName).toBe("H1");
  });

  it("does not duplicate the 'Hi Rob' h1 when button is clicked multiple times", async () => {
    const user = userEvent.setup();
    render(<TestPage />);

    const button = screen.getByRole("button", { name: /say hi rob/i });
    await user.click(button);
    await user.click(button);
    await user.click(button);

    const hiRobHeadings = screen.getAllByRole("heading", { name: /hi rob/i });
    expect(hiRobHeadings).toHaveLength(1);
  });

  it("does not show 'Hi Rob' h1 before the button is clicked", () => {
    render(<TestPage />);
    const hiRobHeading = screen.queryByRole("heading", { name: /hi rob/i });
    expect(hiRobHeading).not.toBeInTheDocument();
  });
});
