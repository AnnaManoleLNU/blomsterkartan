import { Flower } from "lucide-react";
import { useLocation } from "react-router";

export default function Header() {
  const location = useLocation();

  const links = [
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
            {links.map(({ href, label }) => {
              const isActive = location.pathname === href;

              return (
                <li key={href}>
                  <a
                    href={href}
                    className="group flex items-center space-x-2 text-base"
                  >
                    <Flower
                      size={18}
                      className={`transition-all duration-200 mt-0.5
                        ${
                          isActive
                            ? "text-green"
                            : "opacity-0 group-hover:opacity-100"
                        }
                        group-hover:text-current
                      `}
                    />
                    <span>{label}</span>
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
