"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-4xl text-white">Bem-vindo à Task Manager</h1>
      <p className="text-zinc-400">
        Organize suas tarefas de forma simples e segura
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => router.push("/login")}
          className="bg-blue-600 px-4 py-2 rounded-md text-white"
        >
          Login
        </button>
        <button
          onClick={() => router.push("/register")}
          className="bg-zinc-700 px-4 py-2 rounded-md text-white"
        >
          Registrar
        </button>
      </div>
    </div>
  );
}
