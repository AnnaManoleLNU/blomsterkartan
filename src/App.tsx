import Header from "./custom-components/header";
import { Outlet } from "react-router";

function App() {
  return (
    <div className="flex flex-col min-h-screen px-10 pt-4">
      <Header />

      <main className="flex-grow">
        {/* This Outlet will render the child routes defined in main.tsx */}
        <Outlet />
      </main>
      <footer className="mt-auto">Copyright {new Date().getFullYear()}</footer>
    </div>
  );
}

export default App;
