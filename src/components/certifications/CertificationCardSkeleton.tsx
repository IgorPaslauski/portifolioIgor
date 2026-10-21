export const CertificationCardSkeleton = () => {
  return (
    <div aria-hidden="true" className="animate-pulse border border-border p-6">
      <div className="mb-3 h-6 w-3/4 bg-muted" />
      <div className="mb-6 h-4 w-1/3 bg-muted" />
      <div className="mb-2 h-4 w-full bg-muted" />
      <div className="mb-6 h-4 w-5/6 bg-muted" />
      <div className="h-4 w-24 bg-muted" />
    </div>
  );
};
