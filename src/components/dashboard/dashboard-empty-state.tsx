import { BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function DashboardEmptyState() {
  return (
    <Card className="flex-1 items-center justify-center p-0">
      <CardContent className="flex flex-col items-center justify-center px-4 py-8 sm:py-12">
        <BarChart3 className="size-12 text-muted-foreground sm:size-16 lg:size-20" />
        <h2 className="mt-4 text-lg font-semibold sm:mt-6 sm:text-xl lg:text-2xl">
          No data yet
        </h2>
        <p className="mt-2 text-center text-xs text-muted-foreground sm:text-sm">
          Start adding expenses to see your spending analytics
        </p>
      </CardContent>
    </Card>
  );
}
