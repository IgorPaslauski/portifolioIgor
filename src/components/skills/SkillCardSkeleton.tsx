const SkillCardSkeleton = () => {
  return (
    <div aria-hidden="true" className="animate-pulse border border-border p-6">
      <div className="mb-3 h-6 w-1/3 bg-muted" />
      <div className="mb-6 h-4 w-2/3 bg-muted" />
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="h-8 bg-muted" />
        ))}
      </div>
    </div>
  );
};

export default SkillCardSkeleton;
