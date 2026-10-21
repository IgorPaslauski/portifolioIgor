export interface PostProps {
  id: string;
  title: string;
  description: string;
  pubDate: string;
  categories: string[];
  link: string;
  image?: string;
  featured?: boolean;
}

const PostCard = ({ title, description, pubDate, categories, link, image, featured }: PostProps) => {
  const source = image || `${import.meta.env.VITE_API_URL}/post-placeholder.png`;
  const summary = description;

  if (featured) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="group grid items-end gap-6 lg:grid-cols-12">
        <div className="overflow-hidden bg-muted lg:col-span-7">
          <img src={source} alt="" className="aspect-[16/9] w-full object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-[1.03]" />
        </div>
        <div className="lg:col-span-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{pubDate}</p>
          <h3 className="mt-3 text-3xl leading-tight group-hover:text-signal sm:text-4xl">{title}</h3>
          <p className="mt-4 text-muted-foreground">{summary}</p>
          {categories.length > 0 && (
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-signal">{categories.slice(0, 3).join(" · ")}</p>
          )}
          <p className="mt-6 text-sm underline decoration-signal underline-offset-4">Ler artigo</p>
        </div>
      </a>
    );
  }

  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="group grid grid-cols-[7rem_1fr] gap-4 border-t border-border py-5 sm:grid-cols-[10rem_1fr]">
      <div className="overflow-hidden bg-muted">
        <img src={source} alt="" className="aspect-[4/3] h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.03]" />
      </div>
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{pubDate}</p>
        <h3 className="mt-2 font-display text-xl font-bold leading-snug group-hover:text-signal sm:text-2xl">{title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{summary}</p>
      </div>
    </a>
  );
};

export default PostCard;
