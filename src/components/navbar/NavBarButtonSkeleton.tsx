import { cn } from "@/lib/utils";

export interface NavBarButtonSkeletonProps {
  className?: string;
}

function NavBarButtonSkeleton({ className }: NavBarButtonSkeletonProps) {
  return (
    <div
      className={cn(
        "hover:shadow-lg transition-shadow duration-800 animate-pulse",
        className
      )}
    >
      <div className="w-16 h-4 bg-gray-200 rounded"></div>
    </div>
  );
}

export default NavBarButtonSkeleton;
