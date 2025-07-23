import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router";
import About from './features/about/index.tsx';
import App from './App.tsx';
import Home from './features/home/index.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <BrowserRouter>
  <Routes>
    <Route element={<App />} >
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    </Route>
  </Routes>
  </BrowserRouter>
  </StrictMode>
)
