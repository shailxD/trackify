import type { Expense } from "@/store/expenses-store";
import { useExpensesUIStore } from "@/store/expenses-ui-store";
import { EmptyState } from "./Table/empty-state";
import { TableContent } from "./Table/table-content";
import { TablePagination } from "./Table/table-pagination";

type ExpenseTableProps = {
  expenses: Expense[];
  totalExpenses: number;
};

const ITEMS_PER_PAGE = 8;

export function ExpenseTable({ expenses, totalExpenses }: ExpenseTableProps) {
  const { currentPage, setCurrentPage } = useExpensesUIStore();

  const hasExpenses = totalExpenses > 0;

  const totalPages = Math.ceil(expenses.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedExpenses = expenses.slice(startIndex, endIndex);
  const showPagination = expenses.length > ITEMS_PER_PAGE;

  if (expenses.length === 0) {
    // Show "No expenses found" if we have expenses in store but filtered list is empty
    // Show "Create your first expense" if we truly have no expenses at all
    return <EmptyState hasActiveFilters={hasExpenses} />;
  }

  return (
    <div className="flex flex-1 flex-col justify-between gap-4">
      <TableContent expenses={paginatedExpenses} />

      {showPagination && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          startIndex={startIndex}
          endIndex={endIndex}
          totalItems={expenses.length}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
