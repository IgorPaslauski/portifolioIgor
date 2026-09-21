import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { CasePage } from "@/pages/case";
import { HomePage } from "@/pages/home";
import { NotFoundPage } from "@/pages/not-found";

function SpaRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirect = sessionStorage.getItem("spa-redirect");
    if (!redirect) return;
    sessionStorage.removeItem("spa-redirect");
    if (redirect !== "/" && redirect !== window.location.pathname) {
      navigate(redirect, { replace: true });
    }
  }, [navigate]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <SpaRedirect />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portifolioIgor" element={<Navigate to="/" replace />} />
        <Route path="/obra/:slug" element={<CasePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
