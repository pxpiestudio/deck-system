import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, ...props }, ref) => (
    <table
      ref={ref}
      className={cn("w-full border-collapse text-[13px]", className)}
      {...props}
    />
  )
)
Table.displayName = "Table"

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn("", className)} {...props} />
  )
)
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn("", className)} {...props} />
  )
)
TableBody.displayName = "TableBody"

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement> & { interactive?: boolean }>(
  ({ className, interactive, ...props }, ref) => (
    <motion.tr
      ref={ref}
      className={cn(
        "border-b border-[var(--border)] transition-colors",
        interactive && "cursor-pointer hover:bg-[color-mix(in_oklch,var(--text)_4%,transparent)]",
        className
      )}
      whileHover={interactive ? { backgroundColor: "color-mix(in oklch, var(--text) 4%, transparent)" } : undefined}
      transition={{ duration: 0.12 }}
      {...props as any}
    />
  )
)
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        "text-left font-semibold text-[11px] text-[var(--faint)] uppercase tracking-[0.06em] px-4 py-3 border-b border-[var(--border)] bg-[color-mix(in_oklch,var(--surface-2)_50%,transparent)]",
        className
      )}
      {...props}
    />
  )
)
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={cn("px-4 py-3.5 text-[var(--text)]", className)}
      {...props}
    />
  )
)
TableCell.displayName = "TableCell"

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell }
