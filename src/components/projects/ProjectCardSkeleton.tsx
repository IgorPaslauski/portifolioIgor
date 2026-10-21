const ProjectCardSkeleton = () => {
  return (
    <div aria-hidden="true" className="grid animate-pulse border border-border md:grid-cols-12">
      <div className="aspect-[16/10] bg-muted md:col-span-5 md:aspect-auto md:min-h-56" />
      <div className="space-y-4 p-6 md:col-span-7 md:p-8">
        <div className="h-8 w-1/2 bg-muted" />
        <div className="h-4 w-full bg-muted" />
        <div className="h-4 w-5/6 bg-muted" />
        <div className="flex gap-2">
          <div className="h-6 w-16 bg-muted" />
          <div className="h-6 w-20 bg-muted" />
        </div>
        <div className="flex gap-6 pt-4">
          <div className="h-4 w-16 bg-muted" />
          <div className="h-4 w-16 bg-muted" />
        </div>
      </div>
    </div>
  );
};

export default ProjectCardSkeleton;
