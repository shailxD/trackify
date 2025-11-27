import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import useExpensesStore from "@/store/expenses-store";
import { useExpensesUIStore } from "@/store/expenses-ui-store";
import { ExpenseHeader } from "@/components/expenses/expense-header";
import { ExpenseForm } from "@/components/expenses/expense-form";
import { ExpenseTable } from "@/components/expenses/expense-table";
import { DeleteExpenseDialog } from "@/components/expenses/delete-expense-dialog";
import type { ExpenseFormValues } from "@/types/expenses";
import { isWithinInterval, parseISO } from "date-fns";
import { useDebounce } from "@/hooks/use-debounce";

export const Route = createFileRoute("/_app/expenses")({
  component: RouteComponent,
});

function RouteComponent() {
  const { expenses, addExpense, updateExpense, deleteExpense } =
    useExpensesStore();

  const {
    dialogState,
    closeDialog,
    deleteId,
    setDeleteId,
    selectedCategory,
    dateRange,
    searchQuery,
  } = useExpensesUIStore();

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Filter expenses based on category, date range, and search query
  const filteredExpenses = useMemo(() => {
    return expenses
      .filter((expense) => {
        // Search filter (fuzzy search across title, category, notes, and amount)
        if (debouncedSearchQuery) {
          const query = debouncedSearchQuery.toLowerCase();
          const matchesTitle = expense.title.toLowerCase().includes(query);
          const matchesCategory = expense.category
            .toLowerCase()
            .includes(query);
          const matchesNotes = expense.notes?.toLowerCase().includes(query);
          const matchesAmount = expense.amount.toString().includes(query);

          if (
            !matchesTitle &&
            !matchesCategory &&
            !matchesNotes &&
            !matchesAmount
          ) {
            return false;
          }
        }
        // Category filter
        if (selectedCategory && expense.category !== selectedCategory) {
          return false;
        }

        // Date range filter
        if (dateRange?.from) {
          const expenseDate = parseISO(expense.date);
          if (dateRange.to) {
            // Both from and to dates
            if (
              !isWithinInterval(expenseDate, {
                start: dateRange.from,
                end: dateRange.to,
              })
            ) {
              return false;
            }
          } else {
            // Only from date (same day)
            if (expenseDate.toDateString() !== dateRange.from.toDateString()) {
              return false;
            }
          }
        }

        return true;
      })
      .sort((a, b) => {
        // Sort by date: latest first
        const dateA = parseISO(a.date);
        const dateB = parseISO(b.date);
        return dateB.getTime() - dateA.getTime();
      });
  }, [expenses, selectedCategory, dateRange, debouncedSearchQuery]);

  const handleFormSubmit = (data: ExpenseFormValues) => {
    if (dialogState.mode === "edit" && dialogState.expense) {
      updateExpense(dialogState.expense.id, data);
    } else {
      addExpense(data);
    }
    closeDialog();
  };

  const handleDelete = () => {
    if (deleteId) {
      deleteExpense(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <div className="flex flex-1 flex-col space-y-4 sm:space-y-6">
      <ExpenseHeader />

      <ExpenseForm
        isOpen={dialogState.isOpen}
        onClose={closeDialog}
        onSubmit={handleFormSubmit}
        expense={dialogState.expense}
        mode={dialogState.mode}
      />

      <ExpenseTable
        expenses={filteredExpenses}
        totalExpenses={expenses.length}
      />

      <DeleteExpenseDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
