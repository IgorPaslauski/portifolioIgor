import type { ReactNode } from "react";
import { ChapterNav } from "./chapter-nav";
import { Footer } from "./footer";
import { Loader } from "./loader";
import { SkipLink } from "./skip-link";

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <SkipLink />
      <Loader />
      <ChapterNav />
      {children}
      <Footer />
    </>
  );
}
