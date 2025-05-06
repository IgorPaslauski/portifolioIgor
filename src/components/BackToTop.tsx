import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import clsx from "clsx"; // Opcional, para simplificar classes condicionalmente

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(window.scrollY > 300);
  };

  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <button
      onClick={backToTop}
      className={clsx(
        "fixed bottom-4 right-4 bg-blue-500 text-white rounded-full p-2 z-10 transition-opacity duration-300 ease-in-out",
        isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
    >
      <ArrowUp />
    </button>
  );
}
