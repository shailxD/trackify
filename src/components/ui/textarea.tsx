import * as React from "react";
import TextareaAutosize from "react-textarea-autosize";

import { cn } from "@/lib/utils";

type TextareaProps = Omit<
  React.ComponentProps<typeof TextareaAutosize>,
  "ref"
> & {
  minRows?: number;
  maxRows?: number;
};

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, minRows = 2, maxRows, ...props }, ref) => {
    return (
      <TextareaAutosize
        ref={ref}
        minRows={minRows}
        maxRows={maxRows}
        data-slot="textarea"
        className={cn(
          "flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40",
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
