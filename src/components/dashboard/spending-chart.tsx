import { Label, Pie, PieChart } from "recharts";
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

type SpendingChartProps = {
  totalExpense: number;
  categoryTotals: CategoryTotal[];
  formatCurrency: (amount: number) => string;
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

export function SpendingChart({
  totalExpense,
  categoryTotals,
  formatCurrency,
}: SpendingChartProps) {
  if (categoryTotals.length === 0) {
    return null;
  }

  return (
    <Card className="flex flex-1 flex-col xl:col-span-3">
      <CardHeader className="items-center pb-2 sm:pb-0">
        <CardTitle className="text-lg sm:text-xl">
          Spending by Category
        </CardTitle>
        <p className="text-xs text-muted-foreground sm:text-sm">
          Visual breakdown of your expenses
        </p>
      </CardHeader>
      <CardContent className="grid flex-1 gap-4 p-0 lg:grid-cols-2">
        <div className="flex items-center justify-center py-4 sm:py-6">
          <div className="flex-1">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px] pb-0 sm:max-h-[300px] lg:max-h-[350px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent hideLabel className="min-w-40" />
                  }
                />
                <Pie
                  data={categoryTotals}
                  dataKey="total"
                  nameKey="category"
                  innerRadius={80}
                  strokeWidth={5}
                  className="[&_.recharts-pie-sector]:sm:stroke-[5px]"
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-2xl font-semibold sm:text-3xl lg:text-4xl"
                            >
                              {formatCurrency(totalExpense)}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 30}
                              className="fill-muted-foreground text-xs sm:text-sm"
                            >
                              Total Expenses
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 px-4 pb-4 sm:grid-cols-3 sm:px-6 lg:px-0">
          {/* Category Cards */}
          {categoryTotals.map(({ category, total }) => (
            <div
              key={category}
              className="flex flex-col justify-center gap-2 rounded-lg border p-3 sm:gap-3 sm:border-0 sm:p-2"
            >
              <h2 className="text-xs font-medium italic sm:text-sm">
                {category}
              </h2>
              <div className="flex flex-col gap-1">
                <div className="text-lg font-semibold sm:text-xl lg:text-2xl">
                  {formatCurrency(total)}
                </div>
                <p className="text-[10px] text-muted-foreground sm:text-xs">
                  {((total / totalExpense) * 100).toFixed(1)}% of total
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
