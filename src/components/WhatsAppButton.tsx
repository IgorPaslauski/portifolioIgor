import { MessageCircle } from "lucide-react";
import clsx from "clsx";

export default function WhatsAppButton() {
    const openWhatsApp = () => {
        window.open("https://wa.me/55997311689", "_blank");
    };

    return (
        <button
            onClick={openWhatsApp}
            className={clsx(
                "fixed bottom-4 right-4 bg-green-500 text-white rounded-full p-2 z-10 transition-opacity duration-300 ease-in-out",
                "opacity-100 pointer-events-auto"
            )}
        >
            <MessageCircle />
        </button>
    );
}