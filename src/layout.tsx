import type { ReactNode } from "react";
import Header from "./custom-components/header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <footer>I am a footer.</footer>
    </>
  );
}
