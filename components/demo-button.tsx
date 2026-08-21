"use client";

import { Button } from "@/components/ui/button";
import { openBookingDemo } from "@/lib/booking-demo";

type DemoButtonProps = {
  variant?: "primary" | "secondary" | "ghost" | "invert";
  withArrow?: boolean;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
};

export function DemoButton({ onClick, ...props }: DemoButtonProps) {
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
