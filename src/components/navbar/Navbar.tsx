import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "../ThemeToggle";
import NavBarButton from "./NavBarButton";
import NavBarButtonSkeleton from "./NavBarButtonSkeleton";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const [navs, setNavs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(import.meta.env.VITE_API_URL + "/navs.json")
      .then((response) => response.json())
      .then((data) => {
        setNavs(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-xl font-bold gradient-text">Igor.dev</span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <NavBarButtonSkeleton key={index} />
              ))
            : navs.map((nav) => (
                <NavBarButton
                  key={nav.id}
                  onClick={() => scrollToSection(nav.id)}
                >
                  {nav.label}
                </NavBarButton>
              ))}
          <ThemeToggle />
        </div>
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 py-4 px-4 shadow-md">
          <div className="flex flex-col space-y-4">
            {loading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <NavBarButtonSkeleton key={index} />
                ))
              : navs.map((nav) => (
                  <NavBarButton
                    key={nav.id}
                    onClick={() => scrollToSection(nav.id)}
                    className="py-2"
                  >
                    {nav.label}
                  </NavBarButton>
                ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
