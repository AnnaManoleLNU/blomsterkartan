import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Login() {
  const [identifier, setIdentifier] = useState(""); // email or username
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Login failed");

      // Save token somewhere (localStorage, cookie, or context)
      localStorage.setItem("token", data.token);

      setSuccess(true);
      // Optionally redirect user here or fetch user data
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  }

  return (
    <div className="max-w-md mx-auto h-[80vh] flex flex-col justify-center text-center">
      <h1 className="text-xl">Välkommen tillbaka till Blomsterkartan!</h1>
      <p className="mb-4 text-sm text-muted-foreground">
        Logga in med användarnamn eller email för att se dina favorit blommor och mer.
      </p>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <Input
          type="text"
          placeholder="Användarnamn eller Email"
          required
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Lösenord"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-blue text-white p-2 rounded">
          Logga in
        </button>

        {error && <p className="text-destructive">{error}</p>}
        {success && (
          <p className="text-green">Inloggning lyckades! Välkommen tillbaka.</p>
        )}
      </form>

      <p className="mt-8 text-sm">
        Ny här?{" "}
        <a href="/signup" className="text-green font hover:underline">
          Skapa ett konto
        </a>
      </p>
    </div>
  );
}
