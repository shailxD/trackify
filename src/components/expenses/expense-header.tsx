import { Plus, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { EXPENSE_CATEGORIES } from "@/types/expenses";
import { format } from "date-fns";
import { useExpensesUIStore } from "@/store/expenses-ui-store";
import useExpensesStore from "@/store/expenses-store";

export function ExpenseHeader() {
  const {
    openAddDialog,
    selectedCategory,
    setSelectedCategory,
    dateRange,
    setDateRange,
    searchQuery,
    setSearchQuery,
  } = useExpensesUIStore();

  const { expenses } = useExpensesStore();

  return (
    <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold sm:text-2xl">Expenses</h1>
        <p className="text-xs text-muted-foreground sm:text-sm">
          Track all your spending in one place
        </p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center lg:flex-nowrap">
        {/* Search Input */}
        <div className="relative w-full sm:w-48 lg:w-56 xl:w-64">
          <Search className="absolute top-2.5 left-2.5 size-4 text-muted-foreground" />
          <Input
            disabled={expenses.length === 0}
            type="text"
            placeholder="Search expenses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Category Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              disabled={expenses.length === 0}
              className="w-full sm:w-auto"
            >
              <Filter className="size-4 shrink-0" />
              <span className="truncate">
                {selectedCategory || "All Categories"}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={selectedCategory === null}
              onCheckedChange={() => setSelectedCategory(null)}
            >
              All Categories
            </DropdownMenuCheckboxItem>
            {EXPENSE_CATEGORIES.map((category) => (
              <DropdownMenuCheckboxItem
                key={category}
                checked={selectedCategory === category}
                onCheckedChange={() => setSelectedCategory(category)}
              >
                {category}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Date Range Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              disabled={expenses.length === 0}
              className="w-full sm:w-auto"
            >
              <Filter className="size-4 shrink-0" />
              <span className="truncate">
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "MMM d")} -{" "}
                      {format(dateRange.to, "MMM d, yyyy")}
                    </>
                  ) : (
                    format(dateRange.from, "MMM d, yyyy")
                  )
                ) : (
                  "All Dates"
                )}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={1}
              className="sm:block"
            />
            <Calendar
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
              className="hidden sm:block"
            />
            {dateRange && (
              <div className="border-t p-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full"
                  onClick={() => setDateRange(undefined)}
                >
                  Clear
                </Button>
              </div>
            )}
          </PopoverContent>
        </Popover>

        {/* Add Expense Button */}
        <Button onClick={openAddDialog} className="w-full sm:w-auto">
          <Plus className="size-4" />
          Add Expense
        </Button>
      </div>
    </div>
  );
}
