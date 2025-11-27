import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

const STORAGE_KEY = "trackify_expenses";

export type Expense = {
  id: string;
  title: string;
  amount: number;
  category:
    | "Food"
    | "Transport"
    | "Shopping"
    | "Bills"
    | "Entertainment"
    | "Other";
  date: string; // ISO date format
  notes?: string;
  createdAt: string; // ISO datetime
};

type ExpensesState = {
  expenses: Expense[];
  addExpense: (expenseInput: Omit<Expense, "id" | "createdAt">) => void;
  updateExpense: (
    id: string,
    updates: Partial<Omit<Expense, "id" | "createdAt">>
  ) => void;
  deleteExpense: (id: string) => void;
};

// Helper to load expenses from localStorage
const loadExpenses = (): Expense[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Failed to load expenses from localStorage:", error);
  }
  return [];
};

// Helper to save expenses to localStorage
const saveExpenses = (expenses: Expense[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  } catch (error) {
    console.error("Failed to save expenses to localStorage:", error);
  }
};

const useExpensesStore = create<ExpensesState>((set) => ({
  expenses: loadExpenses(),

  addExpense: (expenseInput) => {
    const newExpense: Expense = {
      ...expenseInput,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };

    set((state) => {
      const updatedExpenses = [newExpense, ...state.expenses];
      saveExpenses(updatedExpenses);
      return { expenses: updatedExpenses };
    });
  },

  updateExpense: (id, updates) => {
    set((state) => {
      const updatedExpenses = state.expenses.map((expense) =>
        expense.id === id ? { ...expense, ...updates } : expense
      );
      saveExpenses(updatedExpenses);
      return { expenses: updatedExpenses };
    });
  },

  deleteExpense: (id) => {
    set((state) => {
      const updatedExpenses = state.expenses.filter(
        (expense) => expense.id !== id
      );
      saveExpenses(updatedExpenses);
      return { expenses: updatedExpenses };
    });
  },
}));

export default useExpensesStore;
