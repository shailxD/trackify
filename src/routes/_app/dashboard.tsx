import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import useExpensesStore from "@/store/expenses-store";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { SpendingChart } from "@/components/dashboard/spending-chart";
import { CategoryBarChart } from "@/components/dashboard/category-bar-chart";
import { DashboardEmptyState } from "@/components/dashboard/dashboard-empty-state";

export const Route = createFileRoute("/_app/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const { expenses } = useExpensesStore();

  // Compute total expense
  const totalExpense = useMemo(() => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [expenses]);

  // Compute category-wise totals
  const categoryTotals = useMemo(() => {
    const totals = expenses.reduce(
      (acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
      },
      {} as Record<string, number>
    );

    return Object.entries(totals)
      .map(([category, total]) => ({
        category,
        total,
        fill: `var(--color-${category})`,
      }))
      .sort((a, b) => b.total - a.total);
  }, [expenses]);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="flex flex-1 flex-col space-y-4 sm:space-y-6 lg:space-y-8">
      <DashboardHeader />

      {expenses.length === 0 ? (
        <DashboardEmptyState />
      ) : (
        <div className="grid flex-1 gap-4 md:gap-6 xl:grid-cols-5">
          <SpendingChart
            categoryTotals={categoryTotals}
            totalExpense={totalExpense}
            formatCurrency={formatCurrency}
          />

          <CategoryBarChart categoryTotals={categoryTotals} />
        </div>
      )}
    </div>
  );
}
