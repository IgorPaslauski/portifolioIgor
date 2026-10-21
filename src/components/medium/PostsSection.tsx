import { useEffect, useState } from "react";
import PostCard, { PostProps } from "./PostCard";

export interface PostDto {
  id: string;
  title: string;
  description: string;
  pubDate: string;
  categories: string[];
  link: string;
  image?: string;
}

function summarize(html: string, title: string) {
  const text = html
    .replace(/<figcaption[\s\S]*?<\/figcaption>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
  let body = text;
  const heading = title.replace(/\s+/g, " ").trim();
  for (let pass = 0; pass < 2; pass += 1) {
    if (heading && body.toLowerCase().startsWith(heading.toLowerCase())) {
      body = body.slice(heading.length).replace(/^[\s|:–—-]+/, "").trim();
    }
  }
  if (!body) body = text;
  const slice = body.slice(0, 170);
  const stop = slice.search(/[.!?](\s|$)/);
  if (stop >= 70) return slice.slice(0, stop + 1);
  return `${slice.replace(/[,:;]\s*$/, "").trim()}…`;
}

const PostsSection = () => {
  const [posts, setPosts] = useState<PostDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const apiUrl = "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@igor.pedroso123";
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data = await response.json();
        if (data.status !== "ok") throw new Error("API response status is not ok");

        const formattedPosts: PostDto[] = data.items.map((item: {
          guid?: string;
          link?: string;
          title?: string;
          description?: string;
          pubDate?: string;
          categories?: string[];
        }) => ({
          id: item.guid || `post-${item.link}`,
          title: item.title || "Sem título",
          description: item.description ? summarize(item.description, item.title || "") : "Sem descrição",
          pubDate: new Date(item.pubDate || "").toLocaleDateString("pt-BR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          categories: item.categories || [],
          link: item.link || "#",
          image: item.description?.match(/<img[^>]+src="([^">]+)"/)?.[1] || "",
        }));

        setPosts(formattedPosts);
        setLoading(false);
      } catch {
        setError("Não foi possível carregar os artigos.");
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const [featured, ...rest] = posts;

  return (
    <section id="posts" aria-busy={loading} className="scroll-mt-24 px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mb-12 flex items-end justify-between gap-6">
        <div>
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-signal">Medium</p>
          <h2>Escrita técnica</h2>
        </div>
      </div>
      {loading && <p className="sr-only">Carregando artigos</p>}
      <div className="min-h-[24rem]">
        {loading ? (
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="aspect-[16/9] bg-muted lg:col-span-7" />
            <div className="space-y-3 lg:col-span-5">
              <div className="h-3 w-32 bg-muted" />
              <div className="h-10 w-full bg-muted" />
              <div className="h-4 w-5/6 bg-muted" />
            </div>
          </div>
        ) : error ? (
          <div role="alert" className="py-8 text-destructive">{error}</div>
        ) : (
          <div className="space-y-10">
            {featured && <PostCard {...(featured as PostProps)} featured />}
            <div>
              {rest.map((post) => (
                <PostCard key={post.id} {...post} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PostsSection;
