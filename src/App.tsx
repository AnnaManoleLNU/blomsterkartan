import Header from "./custom-components/header";
import { Outlet } from "react-router";

function App() {
  return (
    <div className="px-10 pt-4">
      <Header />
      {/* Child routes are rendered through Outlet */}
      <main className="h-full">
        <Outlet />
      </main>

      <footer>I am a footer.</footer>
    </div>
  );
}

export default App;
