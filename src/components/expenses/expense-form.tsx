import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  expenseSchema,
  type ExpenseFormValues,
  EXPENSE_CATEGORIES,
} from "@/types/expenses";
import type { Expense } from "@/store/expenses-store";
import { useEffect } from "react";

type ExpenseFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ExpenseFormValues) => void;
  expense?: Expense | null;
  mode: "add" | "edit";
};

export function ExpenseForm({
  isOpen,
  onClose,
  onSubmit,
  expense,
  mode,
}: ExpenseFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      title: "",
      amount: 0,
      category: "Food",
      date: new Date().toISOString().split("T")[0],
      notes: "",
    },
  });

  const selectedCategory = watch("category");
  const selectedDate = watch("date");

  useEffect(() => {
    if (expense) {
      reset({
        title: expense.title,
        amount: expense.amount,
        category: expense.category,
        date: expense.date,
        notes: expense.notes || "",
      });
    } else {
      reset({
        title: "",
        amount: 0,
        category: "Food",
        date: new Date().toISOString().split("T")[0],
        notes: "",
      });
    }
  }, [expense, reset]);

  const handleFormSubmit = (data: ExpenseFormValues) => {
    onSubmit(data);
    reset({
      title: "",
      amount: 0,
      category: "Food",
      date: new Date().toISOString().split("T")[0],
      notes: "",
    });
  };

  const handleCancel = () => {
    onClose();
    reset({
      title: "",
      amount: 0,
      category: "Food",
      date: new Date().toISOString().split("T")[0],
      notes: "",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">
            {mode === "add" ? "Add New Expense" : "Edit Expense"}
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            {mode === "add"
              ? "Fill in the details to add a new expense."
              : "Update the details of your expense."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm">
              Title
            </Label>
            <Input
              id="title"
              placeholder="Enter expense title"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-xs text-destructive sm:text-sm">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount" className="text-sm">
              Amount
            </Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              {...register("amount", { valueAsNumber: true })}
            />
            {errors.amount && (
              <p className="text-xs text-destructive sm:text-sm">
                {String(errors.amount.message)}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm">
                Category
              </Label>
              <Select
                value={selectedCategory}
                onValueChange={(value: string) =>
                  setValue("category", value as ExpenseFormValues["category"])
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {EXPENSE_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-xs text-destructive sm:text-sm">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm">
                Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left text-sm font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 size-4 shrink-0" />
                    <span className="truncate">
                      {selectedDate
                        ? format(new Date(selectedDate), "PPP")
                        : "Pick a date"}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate ? new Date(selectedDate) : undefined}
                    onSelect={(date) => {
                      if (date) {
                        setValue("date", format(date, "yyyy-MM-dd"));
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.date && (
                <p className="text-xs text-destructive sm:text-sm">
                  {errors.date.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm">
              Notes (Optional)
            </Label>
            <Textarea
              id="notes"
              placeholder="Add any additional notes"
              minRows={2}
              maxRows={6}
              className="resize-none text-sm wrap-break-word"
              {...register("notes")}
            />
          </div>

          <DialogFooter className="flex-col gap-2 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button type="submit" className="w-full sm:w-auto">
              {mode === "add" ? "Add Expense" : "Update Expense"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
