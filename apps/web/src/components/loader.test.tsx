import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Loader from "./loader";

describe("Loader", () => {
  it("renders a spinning loader", () => {
    const { container } = render(<Loader />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("has flex centering classes", () => {
    const { container } = render(<Loader />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("flex");
    expect(wrapper.className).toContain("items-center");
    expect(wrapper.className).toContain("justify-center");
  });
});
