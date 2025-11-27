export function DashboardHeader() {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-xl font-semibold sm:text-2xl">Dashboard</h1>
      <p className="text-xs text-muted-foreground sm:text-sm">
        Overview of your spending
      </p>
    </div>
  );
}
