import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/hello")({
  component: HelloPage,
});

export function HelloPage() {
  return (
    <main className="container mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 py-8">
      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        Hello from Claude Agents Pipeline
      </h1>
      <p className="mt-4 text-muted-foreground">
        Built with the Aurora automated development pipeline.
      </p>
    </main>
  );
}
