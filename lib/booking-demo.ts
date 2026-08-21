type Listener = () => void;

const listeners = new Set<Listener>();

export function openBookingDemo() {
  listeners.forEach((listener) => listener());
}

export function onOpenBookingDemo(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
