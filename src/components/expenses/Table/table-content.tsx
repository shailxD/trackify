import { Ellipsis, Pencil, Trash } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import type { Expense } from "@/store/expenses-store";
import { useExpensesUIStore } from "@/store/expenses-ui-store";

type TableContentProps = {
  expenses: Expense[];
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export function TableContent({ expenses }: TableContentProps) {
  const { openEditDialog, setDeleteId } = useExpensesUIStore();

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden overflow-x-auto rounded-lg border md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-6">Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead className="pr-6 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell className="pl-6 font-medium">
                  {expense.title}
                </TableCell>
                <TableCell>{expense.category}</TableCell>
                <TableCell>{formatCurrency(expense.amount)}</TableCell>
                <TableCell>{formatDate(expense.date)}</TableCell>
                <TableCell className="max-w-xs truncate">
                  {expense.notes || "-"}
                </TableCell>
                <TableCell className="pr-6 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Ellipsis className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openEditDialog(expense)}>
                        <Pencil className="mr-2 size-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setDeleteId(expense.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash className="mr-2 size-4 text-destructive" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="flex flex-col gap-3 md:hidden">
        {expenses.map((expense) => (
          <div key={expense.id} className="rounded-lg border bg-card p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 space-y-1">
                <h3 className="leading-tight font-semibold">{expense.title}</h3>
                <p className="text-xs text-muted-foreground">
                  {expense.category}
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 shrink-0"
                  >
                    <Ellipsis className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => openEditDialog(expense)}>
                    <Pencil className="mr-2 size-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setDeleteId(expense.id)}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash className="mr-2 size-4 text-destructive" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="mt-3 flex items-center justify-between border-t pt-3">
              <div className="space-y-1">
                <p className="text-lg font-semibold">
                  {formatCurrency(expense.amount)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(expense.date)}
                </p>
              </div>
              {expense.notes && (
                <p className="max-w-[50%] truncate text-xs text-muted-foreground">
                  {expense.notes}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
