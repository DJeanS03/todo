"use client";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/"); // 🔥 Redireciona para a página inicial (boas-vindas)
  };

  return (
    <div className="flex justify-between bg-zinc-800 p-4 text-white">
      <div>Olá, {user?.name}</div>
      <a href="/dashboard">Dashboard</a>

      <div className="flex gap-2">
        {user?.role === "ADMIN" && (
          <button
            onClick={() => router.push("/dashboard/users")}
            className="bg-blue-600 px-2 py-1 rounded hover:bg-blue-700 transition"
          >
            Painel Admin
          </button>
        )}

        <button
          onClick={handleLogout}
          className="bg-red-500 px-2 py-1 rounded hover:bg-red-600 transition"
        >
          Sair
        </button>
      </div>
    </div>
  );
}
