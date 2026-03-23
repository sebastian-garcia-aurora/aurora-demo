import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/test")({
  component: TestPage,
});

export function TestPage() {
  const [showHiRob, setShowHiRob] = useState(false);

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-3xl font-bold">Claude did this</h1>

      <button
        type="button"
        onClick={() => setShowHiRob(true)}
        className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        Say Hi Rob
      </button>

      {showHiRob && (
        <h1 className="mt-6 text-3xl font-bold text-blue-700">Hi Rob</h1>
      )}
    </div>
  );
}
