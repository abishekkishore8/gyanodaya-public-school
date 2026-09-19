import { useEffect } from "react";

interface LightboxKeyboardHandlers {
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

/** Wires Escape / arrow keys to the gallery lightbox while it is open. */
export function useLightboxKeyboard(isOpen: boolean, { onClose, onNext, onPrevious }: LightboxKeyboardHandlers) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onNext();
      if (event.key === "ArrowLeft") onPrevious();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onNext, onPrevious]);
}
