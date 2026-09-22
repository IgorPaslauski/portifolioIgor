import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CasePage } from "@/pages/case";
import { HomePage } from "@/pages/home";
import { NotFoundPage } from "@/pages/not-found";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portifolioIgor" element={<Navigate to="/" replace />} />
        <Route path="/obra/:slug" element={<CasePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
