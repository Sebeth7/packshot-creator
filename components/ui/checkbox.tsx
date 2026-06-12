"use client"

import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

type CheckboxProps = Omit<React.ComponentProps<"button">, "onChange"> & {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  name?: string
  value?: string
  disabled?: boolean
}

function Checkbox({
  className,
  checked = false,
  onCheckedChange,
  disabled,
  name,
  value,
  id,
  ...props
}: CheckboxProps) {
  return (
    <>
      <button
        type="button"
        role="checkbox"
        id={id}
        aria-checked={checked}
        disabled={disabled}
        data-state={checked ? "checked" : "unchecked"}
        data-slot="checkbox"
        onClick={() => !disabled && onCheckedChange?.(!checked)}
        className={cn(
          "peer border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-5 shrink-0 rounded-[4px] border bg-transparent shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
          "data-[state=checked]:bg-[var(--primary-orbitvu)] data-[state=checked]:border-[var(--primary-orbitvu)] data-[state=checked]:text-white",
          "flex items-center justify-center",
          className
        )}
        {...props}
      >
        {checked ? <Check className="size-3.5" strokeWidth={3} /> : null}
      </button>
      {name ? (
        <input type="hidden" name={name} value={checked ? value ?? "true" : ""} />
      ) : null}
    </>
  )
}

export { Checkbox }
