import { cn } from "@/lib/utils";

export interface NavBarButtonSkeletonProps {
  className?: string;
}

function NavBarButtonSkeleton({ className }: NavBarButtonSkeletonProps) {
  return (
    <div aria-hidden="true" className={cn("h-5 w-16 animate-pulse bg-muted", className)} />
  );
}

export default NavBarButtonSkeleton;
