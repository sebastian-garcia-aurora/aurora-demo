import { createFileRoute } from "@tanstack/react-router";

import { FullPageLayout } from "@/components/full-page-layout";

export const Route = createFileRoute("/dashboard")({
  component: DashboardComponent,
});

export function DashboardComponent() {
  return (
    <FullPageLayout>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the dashboard. This page uses the{" "}
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm">FullPageLayout</code>{" "}
          component with the collapsible sidebar.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {["Revenue", "Subscriptions", "Active Users"].map((metric) => (
            <div
              key={metric}
              className="rounded-lg border bg-card p-6 shadow-sm"
            >
              <p className="text-sm font-medium text-muted-foreground">{metric}</p>
              <p className="mt-2 text-3xl font-bold">—</p>
            </div>
          ))}
        </div>
      </div>
    </FullPageLayout>
  );
}
