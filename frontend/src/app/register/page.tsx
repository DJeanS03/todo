"use client";

import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const { register } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      router.push("/login");
    } catch {
      alert("Erro ao registrar");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-2xl text-white">Registrar</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 bg-zinc-800 p-4 rounded"
      >
        <input
          type="text"
          placeholder="Nome"
          className="px-2 py-1 rounded bg-zinc-700"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="px-2 py-1 rounded bg-zinc-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          className="px-2 py-1 rounded bg-zinc-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Registrar
        </button>
      </form>
    </div>
  );
}
