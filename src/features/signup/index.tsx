
  import { Input } from "@/components/ui/input";
import { LogIn } from "lucide-react";
import { useState } from "react";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      await res.json();

      if (!res.ok) throw new Error("Signup failed");
      setSuccess(true);
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
      <h1 className="text-xl">Skapa ett konto</h1>
      <p className="mb-4 text-sm text-muted-foreground">Fyll i dina uppgifter för att skapa ett konto.</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
        type="text"
        placeholder="Användarnamn"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Lösenord"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-green text-white p-2 rounded">
          Skapa konto
        </button>

        {error && <p className="text-destructive">{error}</p>}
        {success && (
          <p className="text-green">Konto skapades! Vänligen logga in.</p>
        )}
      </form>

      {/* another form for signing up */}
      <p className="mt-8 text-sm">
        Redan medlem?{"  "}
        <a href="/login" className="text-green font hover:underline">
        <LogIn className="inline mr-1" />
          Logga in
        </a>
      </p>
    </div>
  );
}
