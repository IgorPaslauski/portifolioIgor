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
}

const PostsSection = () => {
  const [posts, setPosts] = useState<PostDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const proxyUrl = "https://api.allorigins.win/raw?url=";
        const feedUrl = "https://medium.com/feed/@igor.pedroso123";
        const response = await fetch(`${proxyUrl}${encodeURIComponent(feedUrl)}`);
        const xmlText = await response.text();
        const parsedData = await parseStringPromise(xmlText);
        const items = parsedData.rss.channel[0].item || [];

        const formattedPosts = items.map((item: any, index: number) => ({
          id: item.guid[0]["_"],
          title: item.title[0],
          description:
            item["content:encoded"][0]
              .replace(/<[^>]+>/g, "") // Remove HTML tags
              .slice(0, 200) + "...", // Limit to 200 characters
          pubDate: new Date(item.pubDate[0]).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          categories: item.category || [],
          link: item.link[0],
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
    <section id="posts" className="bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="mb-4">
            Meus <span className="gradient-text">Artigos</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Artigos técnicos publicados no Medium sobre programação e desenvolvimento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {loading ? (
            Array(4)
              .fill(0)
              .map((_, index) => <PostCardSkeleton key={index} />)
          ) : error ? (
            <div className="text-center py-8 text-red-500 col-span-2">{error}</div>
          ) : (
            posts.map((post) => <PostCard key={post.id} {...post} />)
          )}
        </div>
      </div>
    </section>
  );
};

export default PostsSection;