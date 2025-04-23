import { cn } from "@/lib/utils";

export interface NavBarButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  className?: string;
}
export default function NavBarButton({
  onClick,
  children,
  className,
}: NavBarButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-gray-700 dark:text-gray-300 hover:text-portfolio-blue transition",
        className
      )}
    >
      {children}
    </button>
  );
}
