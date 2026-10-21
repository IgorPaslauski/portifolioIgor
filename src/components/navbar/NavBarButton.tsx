import { cn } from "@/lib/utils";

export interface NavBarButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  className?: string;
  active?: boolean;
}

export default function NavBarButton({
  onClick,
  children,
  className,
  active = false,
}: NavBarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "true" : undefined}
      className={cn(
        "text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        active && "text-foreground",
        className
      )}
    >
      <span className={cn("border-b pb-1", active ? "border-signal" : "border-transparent")}>
        {children}
      </span>
    </button>
  );
}
