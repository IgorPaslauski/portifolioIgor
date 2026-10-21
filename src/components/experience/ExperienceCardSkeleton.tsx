const ExperienceCardSkeleton = () => {
  return (
    <div aria-hidden="true" className="grid animate-pulse gap-4 border-b border-border py-8 md:grid-cols-12">
      <div className="h-4 w-28 bg-muted md:col-span-3" />
      <div className="space-y-3 md:col-span-9">
        <div className="h-8 w-1/2 bg-muted" />
        <div className="h-4 w-1/3 bg-muted" />
        <div className="h-4 w-full bg-muted" />
        <div className="h-4 w-5/6 bg-muted" />
        <div className="h-4 w-2/3 bg-muted" />
      </div>
    </div>
  );
};

export default ExperienceCardSkeleton;
