import { Flower, Menu, X } from "lucide-react";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";

export default function Header() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const paths = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/google", label: "Login with Google" },
  ];

  const renderLinks = (onClick?: () => void) =>
    paths.map((path) => {
      const isActive = path.href === location.pathname;
      return (
        <li key={path.href}>
          <a
            href={path.href}
            className="group flex items-center space-x-2"
            onClick={onClick}
          >
            <span>
              <Flower
                size={16}
                className={`transition-all duration-200 ${
                  isActive
                    ? "opacity-100 text-green group-hover:text-current"
                    : "opacity-0 group-hover:opacity-100"
                }`}
              />
            </span>
            <span>{path.label}</span>
          </a>
        </li>
      );
    });

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className="p-4 relative z-10">
      <nav className="flex justify-between items-center">
        <Flower />
        <button
          className="md:hidden relative z-50"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} className="mr-3" /> : <Menu size={28}  />}
        </button>
        <ul className="hidden md:flex gap-10 items-center">{renderLinks()}</ul>
      </nav>

      {/* Full-screen mobile menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-background flex flex-col justify-center items-center z-40 md:hidden">
          <ul className="text-3xl space-y-6">
            {renderLinks(() => setIsOpen(false))}
          </ul>
        </div>
      )}
    </header>
  );
}
