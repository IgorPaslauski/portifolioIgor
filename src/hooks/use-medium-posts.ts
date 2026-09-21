import { useEffect, useState } from "react";

export type MediumPost = {
  id: string;
  title: string;
  description: string;
  date: string;
  url: string;
  categories: string[];
};

const FEED = "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@igor.pedroso123";

export function useMediumPosts() {
  const [posts, setPosts] = useState<MediumPost[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;

    fetch(FEED)
      .then((response) => {
        if (!response.ok) throw new Error("feed");
        return response.json();
      })
      .then((data) => {
        if (cancelled) return;
        if (data.status !== "ok") throw new Error("status");

        const items: MediumPost[] = (data.items ?? []).slice(0, 4).map((item: {
          guid?: string;
          link?: string;
          title?: string;
          description?: string;
          pubDate?: string;
          categories?: string[];
        }) => ({
          id: item.guid || item.link || item.title || crypto.randomUUID(),
          title: item.title || "Sem título",
          description: item.description
            ? item.description.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim().slice(0, 180)
            : "Sem descrição.",
          date: item.pubDate
            ? new Date(item.pubDate).toLocaleDateString("pt-BR", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : "",
          url: item.link || "https://medium.com/@igor.pedroso123",
          categories: item.categories ?? [],
        }));

        setPosts(items);
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { posts, status };
}
