import { certifications } from "@/content";
import { useMediumPosts } from "@/hooks/use-medium-posts";

export function Notes() {
  const { posts, status } = useMediumPosts();

  return (
    <section id="caderno" className="relative z-10 px-gutter py-28 md:py-36">
      <div className="mx-auto max-w-page">
        <p className="text-[12px] uppercase tracking-[0.28em] text-dust">Caderno</p>
        <h2 className="mt-4 max-w-2xl font-display text-display-md text-paper">
          Escrita, estudo, o que não cabe num commit.
        </h2>

        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-dust">Medium</h3>
            <div className="mt-6 divide-y divide-paper/10 border-y border-paper/10">
              {status === "loading" &&
                Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="h-24 animate-pulse bg-paper/5" />
                ))}
              {status === "error" && (
                <p className="py-8 text-paper/70">
                  O feed do Medium não respondeu agora. Os textos continuam em{" "}
                  <a className="text-ember underline" href="https://medium.com/@igor.pedroso123">
                    medium.com/@igor.pedroso123
                  </a>
                  .
                </p>
              )}
              {status === "ready" && posts.length === 0 && (
                <p className="py-8 text-paper/70">Nenhum artigo publicado no feed neste momento.</p>
              )}
              {posts.map((post) => (
                <a key={post.id} href={post.url} target="_blank" rel="noreferrer" className="block py-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-dust">{post.date}</p>
                  <h4 className="mt-2 font-display text-2xl text-paper transition-colors hover:text-ember">
                    {post.title}
                  </h4>
                  <p className="mt-2 max-w-xl text-paper/65">{post.description}</p>
                </a>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-5">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-dust">Credenciais</h3>
            <ul className="mt-6 space-y-4">
              {certifications.map((item) => (
                <li key={item.title}>
                  <a href={item.url} target="_blank" rel="noreferrer" className="block border-l-2 border-paper/15 pl-4 hover:border-ember">
                    <p className="text-paper">{item.title}</p>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-dust">
                      {item.issuer} · {item.date}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
