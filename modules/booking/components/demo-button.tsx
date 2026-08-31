"use client";

import type { PropsWithChildren } from "react";
import { Button } from "@/components/ui/button";
import { openBookingDemo } from "@/modules/booking/lib/booking-demo";

type Props = PropsWithChildren<{
  variant?: "primary" | "secondary" | "ghost" | "invert";
  withArrow?: boolean;
  className?: string;
  onClick?: () => void;
}>;

export function DemoButton({ onClick, ...props }: Props) {
  return (
    <Button
      {...props}
      onClick={() => {
        onClick?.();
        openBookingDemo();
      }}
    />
  );
}
