import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <button
      type="button"
      onClick={() => window.open("https://wa.me/55997311689", "_blank")}
      aria-label="Conversar no WhatsApp"
      className="fixed bottom-4 right-4 z-10 bg-[#25D366]/80 p-2 text-white opacity-70 motion-safe:transition-opacity hover:opacity-100 focus-visible:opacity-100 sm:bottom-5 sm:right-5"
    >
      <MessageCircle />
    </button>
  );
}
