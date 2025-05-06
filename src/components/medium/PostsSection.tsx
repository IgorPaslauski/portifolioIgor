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
        const response = await fetch(`${proxyUrl}${encodeURIComponent(feedUrl)}`,
          {
            headers: {
              'Origin': 'https://igorpaslauski.github.io/portifolioIgor'
            },
          });
        if (!response.ok) {
          throw new Error("Failed to fetch RSS feed");
        }
        const xmlText = await response.text();

        // Parse XML using DOMParser
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "application/xml");
        const items = xmlDoc.querySelectorAll("item");

        const formattedPosts: PostDto[] = Array.from(items).map((item, index) => {
          const title = item.querySelector("title")?.textContent || "Untitled";
          const link = item.querySelector("link")?.textContent || "#";
          const pubDate = item.querySelector("pubDate")?.textContent || "";
          const guid = item.querySelector("guid")?.textContent || `post-${index}`;
          const contentElement = Array.from(item.children).find(
            (child) => child.tagName === "content:encoded"
          );
          const content = contentElement?.textContent || "";
          const categories = Array.from(item.querySelectorAll("category")).map(
            (cat) => cat.textContent || ""
          );

          return {
            id: guid,
            title,
            description:
              content.replace(/<[^>]+>/g, "").slice(0, 200) + "...", // Remove HTML tags, limit to 200 chars
            pubDate: new Date(pubDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            categories,
            link,
          };
        });

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
    <section id="posts" className="bg-secondary/50 py-16 md:py-24">
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