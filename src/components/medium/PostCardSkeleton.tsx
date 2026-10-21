const PostCardSkeleton = () => {
  return (
    <div aria-hidden="true" className="animate-pulse border border-border p-6">
      <div className="mb-4 aspect-[16/9] bg-muted" />
      <div className="mb-2 h-6 w-2/3 bg-muted" />
      <div className="mb-4 h-4 w-1/3 bg-muted" />
      <div className="h-4 w-full bg-muted" />
    </div>
  );
};

export default PostCardSkeleton;
