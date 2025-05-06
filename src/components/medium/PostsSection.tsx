import { useEffect, useState } from "react";
import { parseStringPromise } from "xml2js";
import PostCard from "./PostCard";
import PostCardSkeleton from "./PostCardSkeleton";

export interface PostDto {
  id: string;
  title: string;
  description: string;
  pubDate: string;
  categories: string[];
  link: string;
  image?: string;
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
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();

        if (data.status !== "ok") {
          throw new Error("API response status is not ok");
        }

        const formattedPosts: PostDto[] = data.items.map((item: any) => ({
          id: item.guid || `post-${item.link}`,
          title: item.title || "Sem título",
          description: item.description
            ? item.description.replace(/<[^>]+>/g, "").slice(0, 200) + "..."
            : "Sem descrição",
          pubDate: new Date(item.pubDate).toLocaleDateString("pt-BR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          categories: item.categories || [],
          link: item.link || "#",
          image: item.description.match(/<img[^>]+src="([^">]+)"/)?.[1] || "",
        }));

        setPosts(formattedPosts);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch or parse posts");
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section id="posts" className="bg-secondary/50 dark:bg-gray-900 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-black dark:text-white">
            Meus <span className="gradient-text">Artigos</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Artigos técnicos publicados no Medium sobre programação e desenvolvimento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {loading ? (
            Array(4)
              .fill(0)
              .map((_, index) => <PostCardSkeleton key={index} />)
          ) : error ? (
            <div className="text-center py-8 text-red-500 dark:text-red-400 col-span-2">{error}</div>
          ) : (
            posts.map((post) => <PostCard key={post.id} {...post} />)
          )}
        </div>
      </div>
    </section>
  );
};

export default PostsSection;