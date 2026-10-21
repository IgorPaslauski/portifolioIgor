
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { LazyMotion } from "motion/react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ThemeColorSync from "./components/theme/ThemeColorSync";

const queryClient = new QueryClient();

const loadMotionFeatures = () =>
  import("@/lib/motion-features").then((mod) => mod.default);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ThemeColorSync />
      <LazyMotion features={loadMotionFeatures} strict>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/portifolioIgor" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
      </LazyMotion>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
