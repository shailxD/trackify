import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";

type CategoryTotal = {
  category: string;
  total: number;
  fill: string;
};

type CategoryBarChartProps = {
  categoryTotals: CategoryTotal[];
};

// Chart configuration with colors
const chartConfig = {
  total: {
    label: "Total",
  },
  Food: {
    label: "Food",
    color: "var(--chart-1)",
  },
  Transport: {
    label: "Transport",
    color: "var(--chart-2)",
  },
  Shopping: {
    label: "Shopping",
    color: "var(--chart-3)",
  },
  Bills: {
    label: "Bills",
    color: "var(--chart-4)",
  },
  Entertainment: {
    label: "Entertainment",
    color: "var(--chart-5)",
  },
  Other: {
    label: "Other",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function CategoryBarChart({ categoryTotals }: CategoryBarChartProps) {
  if (categoryTotals.length === 0) {
    return null;
  }

  return (
    <Card className="flex flex-1 flex-col xl:col-span-2">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Category Breakdown</CardTitle>
        <p className="text-xs text-muted-foreground sm:text-sm">
          Spending by category comparison
        </p>
      </CardHeader>
      <CardContent className="flex flex-1 pt-2 pb-0">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <BarChart
            accessibilityLayer
            data={categoryTotals}
            layout="vertical"
            barSize={32}
            margin={{
              left: 10,
              right: 10,
            }}
            className="sm:barSize-[40px] lg:barSize-[45px]"
          >
            <YAxis
              dataKey="category"
              type="category"
              tickLine={false}
              tickMargin={8}
              axisLine={false}
              tick={{ fontSize: 12 }}
              width={80}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="total" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel className="min-w-40" />}
            />
            <Bar dataKey="total" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
