import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

export function HomeComponent() {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <h1>Claude Starter</h1>
      <button onClick={() => setVisible((v) => !v)}>Hello Claude</button>
      {visible && <p>This is working!</p>}
    </div>
  );
}
