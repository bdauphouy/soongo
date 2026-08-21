"use client";

import { useCallback, useState } from "react";

export function useDismissableOverlay() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const show = useCallback(() => {
    setMounted(true);
    setOpen(true);
  }, []);

  const hide = useCallback(() => {
    setOpen(false);
  }, []);

  const toggle = useCallback(() => {
    setOpen((v) => {
      const next = !v;
      if (next) setMounted(true);
      return next;
    });
  }, []);

  const onAnimationEnd = useCallback(() => {
    if (!open) setMounted(false);
  }, [open]);

  return { open, mounted, show, hide, toggle, onAnimationEnd };
}
