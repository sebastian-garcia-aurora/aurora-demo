import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/test3")({
  component: Test3Page,
});

export function Test3Page() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-3xl font-bold">Page3</h1>
    </div>
  );
}
