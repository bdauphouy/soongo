"use client";

import { useEffect, useState } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { CalendarCheck, X } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";

const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK;
const CAL_NAMESPACE = "demo-soongo";

export function BookingWidget() {
  const [open, setOpen] = useState(false);
  const [calReady, setCalReady] = useState(false);

  useEffect(() => {
    if (!CAL_LINK || !open) return;
    let cancelled = false;

    (async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      if (cancelled) return;
      cal("ui", {
        theme: "light",
        styles: { branding: { brandColor: "#ff1f78" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
      setCalReady(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [open]);

  return (
    <div className="fixed bottom-5 right-5 z-50 sm:bottom-6 sm:right-6">
      {open && (
        <div className="animate-bounce-in absolute bottom-[calc(100%+0.75rem)] right-0 flex h-[32rem] w-[calc(100vw-2.5rem)] max-w-96 flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl shadow-ink/15">
          <div className="flex items-center justify-between bg-brand-600 px-5 py-4">
            <div>
              <p className="text-sm font-bold text-white">
                Réserver une démo
              </p>
              <p className="text-xs text-white/80">
                Choisissez un créneau, 30 min
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fermer"
              className="flex size-8 shrink-0 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/15"
            >
              <X weight="bold" className="size-4" />
            </button>
          </div>

          <div className="flex-1 overflow-hidden">
            {CAL_LINK ? (
              <Cal
                namespace={CAL_NAMESPACE}
                calLink={CAL_LINK}
                style={{
                  width: "100%",
                  height: "100%",
                  overflow: "auto",
                  opacity: calReady ? 1 : 0,
                  transition: "opacity 0.3s ease",
                }}
                config={{ layout: "month_view", theme: "light" }}
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
                <p className="text-sm leading-relaxed text-ink-soft">
                  Le calendrier de réservation en ligne arrive très bientôt.
                  En attendant, écrivez-nous directement.
                </p>
                <Button
                  href="mailto:demo@soongo.co"
                  withArrow
                  className="text-sm"
                >
                  Demander une démo par email
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Fermer la réservation de démo" : "Réserver une démo"}
        aria-expanded={open}
        className="flex size-14 items-center justify-center rounded-full bg-brand-600 text-white transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-110 active:scale-90"
      >
        {open ? (
          <X weight="bold" className="size-6" />
        ) : (
          <CalendarCheck weight="fill" className="size-6" />
        )}
      </button>
    </div>
  );
}
