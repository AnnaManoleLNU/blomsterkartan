import { Flower } from "lucide-react";

export default function Header() {
  return (
    <header>
      <nav>
        <ul className="flex justify-between">
          <Flower />
          <div className="flex gap-10">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/google">Login with Google</a></li>
          </div>
        </ul>
      </nav>
    </header>
    
  );
}
