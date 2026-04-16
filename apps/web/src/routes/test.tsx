import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/test")({
  component: TestPage,
});

export function TestPage() {
  const [showGreeting, setShowGreeting] = useState(false);

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-3xl font-bold">Hello Multica!</h1>
      <button
        type="button"
        className="mt-4 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
        onClick={() => setShowGreeting(true)}
      >
        Hello
      </button>
      {showGreeting && <p className="mt-4 text-xl">Hello Seba</p>}
    </div>
  );
}
