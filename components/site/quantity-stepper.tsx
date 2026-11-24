"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type QuantityStepperProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  size?: "default" | "sm";
  className?: string;
};

export function QuantityStepper({ value, onChange, min = 1, size = "default", className }: QuantityStepperProps) {
  const btnSize = size === "sm" ? "icon-sm" : "icon";
  return (
    <div className={cn("inline-flex items-center border border-espresso/30", className)}>
      <Button
        type="button"
        variant="ghost"
        size={btnSize}
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label="Giảm số lượng"
      >
        <MinusIcon />
      </Button>
      <span className={cn("text-center text-sm font-semibold tabular-nums", size === "sm" ? "w-6" : "w-8")} aria-live="polite">
        {value}
      </span>
      <Button type="button" variant="ghost" size={btnSize} onClick={() => onChange(value + 1)} aria-label="Tăng số lượng">
        <PlusIcon />
      </Button>
    </div>
  );
}
