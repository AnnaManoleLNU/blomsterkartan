import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import About from "./features/about/index.tsx";
import App from "./App.tsx";
import Home from "./features/home/index.tsx";
import Login from "./features/login/index.tsx";
import Signup from "./features/signup/index.tsx";
import Dashboard from "./features/dashboard/index.tsx";
import { Provider } from "react-redux";
import { store } from "../redux/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
