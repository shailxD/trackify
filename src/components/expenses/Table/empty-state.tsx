import { Plus, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useExpensesUIStore } from "@/store/expenses-ui-store";
import NoteImg from "@/assets/note.svg";

type EmptyStateProps = {
  hasActiveFilters: boolean;
};

export function EmptyState({ hasActiveFilters }: EmptyStateProps) {
  const { openAddDialog, setSelectedCategory, setDateRange, setSearchQuery } =
    useExpensesUIStore();

  const handleClearFilters = () => {
    setSelectedCategory(null);
    setDateRange(undefined);
    setSearchQuery("");
  };

  if (hasActiveFilters) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center rounded-lg border p-6 sm:p-12">
        <SearchX className="size-12 text-muted-foreground sm:size-14 lg:size-16" />
        <h2 className="mt-4 text-lg font-semibold sm:mt-6 sm:text-xl lg:text-2xl">
          No expenses found
        </h2>
        <p className="mt-2 text-center text-xs text-muted-foreground sm:text-sm">
          No expenses match your current filters. Try adjusting your search or
          filters.
        </p>
        <div className="mt-4 sm:mt-6">
          <Button
            size="lg"
            variant="outline"
            onClick={handleClearFilters}
            className="text-sm sm:text-base"
          >
            Clear Filters
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-1 flex-col items-center justify-center rounded-lg border p-6 sm:p-12">
      <img
        src={NoteImg}
        className="size-20 sm:size-24 lg:h-[110px] lg:w-[110px]"
        alt="Empty expenses"
      />
      <h2 className="mt-4 text-lg font-semibold sm:mt-6 sm:text-xl lg:text-2xl">
        Create your first expense!
      </h2>
      <p className="mt-2 text-center text-xs text-muted-foreground sm:text-sm">
        Start by creating a expense to keep track of your spending.
      </p>
      <div className="mt-4 sm:mt-6">
        <Button
          size="lg"
          onClick={openAddDialog}
          className="text-sm sm:text-base"
        >
          <Plus className="size-4" />
          Create Expense
        </Button>
      </div>
    </div>
  );
}
