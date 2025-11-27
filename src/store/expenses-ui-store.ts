import { create } from "zustand";
import type { Expense } from "./expenses-store";
import type { DateRange } from "react-day-picker";

type DialogState = {
  isOpen: boolean;
  mode: "add" | "edit";
  expense?: Expense | null;
};

type ExpensesUIStore = {
  // Dialog state
  dialogState: DialogState;
  setDialogState: (state: DialogState) => void;
  openAddDialog: () => void;
  openEditDialog: (expense: Expense) => void;
  closeDialog: () => void;

  // Delete dialog state
  deleteId: string | null;
  setDeleteId: (id: string | null) => void;

  // Filters
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Pagination
  currentPage: number;
  setCurrentPage: (page: number) => void;
  resetPage: () => void;
};

export const useExpensesUIStore = create<ExpensesUIStore>((set) => ({
  // Dialog state
  dialogState: {
    isOpen: false,
    mode: "add",
    expense: null,
  },
  setDialogState: (state) => set({ dialogState: state }),
  openAddDialog: () =>
    set({ dialogState: { isOpen: true, mode: "add", expense: null } }),
  openEditDialog: (expense) =>
    set({ dialogState: { isOpen: true, mode: "edit", expense } }),
  closeDialog: () =>
    set({ dialogState: { isOpen: false, mode: "add", expense: null } }),

  // Delete dialog state
  deleteId: null,
  setDeleteId: (id) => set({ deleteId: id }),

  // Filters
  selectedCategory: null,
  setSelectedCategory: (category) =>
    set({ selectedCategory: category, currentPage: 1 }),
  dateRange: undefined,
  setDateRange: (range) => set({ dateRange: range, currentPage: 1 }),
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),

  // Pagination
  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),
  resetPage: () => set({ currentPage: 1 }),
}));
