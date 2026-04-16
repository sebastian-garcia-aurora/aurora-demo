import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/test4")({
  component: Test4Page,
});

export function Test4Page() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-3xl font-bold">Page 4</h1>
    </div>
  );
}
