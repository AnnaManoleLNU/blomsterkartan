import { Flower } from "lucide-react";
import { useLocation } from "react-router";

export default function Header() {
  const location = useLocation();

  const paths = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/google", label: "Login with Google" },
  ];
  return (
    <header>
      <nav>
        <ul className="flex justify-between items-center">
          <Flower />
          <div className="flex gap-10 items-center">
            {paths.map((path) => {
              const isActive = path.href === location.pathname;
              return (
                <li key={path.href}>
                  <a
                    href={path.href}
                    className="group flex items-center space-x-2 text-base"
                  >
                    <span>
                      <Flower
                        size={16}
                        className={`transition-all duration-200
                          ${
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
            })}
          </div>
        </ul>
      </nav>
    </header>
  );
}
