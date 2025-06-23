"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
//import { useRouter } from "next/navigation";
import api from "../../utils/axios";
import PrivateRoute from "../../components/routes/PrivateRoute";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

export default function UsersPage() {
  const { token, loading } = useAuth();
  //const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/auth/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(res.data as User[]);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) fetchUsers();
  }, [token]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/auth/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  };

  const handleEdit = (id: number) => {
    alert(
      `Aqui você pode abrir um modal de edição para o usuário com ID ${id}`
    );
    // Podemos fazer o modal de edição depois!
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-zinc-600">Carregando...</p>
      </div>
    );
  }

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-gray-50 px-6 py-10">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Lista de Usuários
        </h1>

        {/* Campo de busca */}
        <div className="mb-4 flex justify-center">
          <input
            type="text"
            placeholder="Buscar por nome ou email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-zinc-300 px-3 py-2 rounded-md w-full max-w-sm focus:ring-2 focus:ring-zinc-600"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-zinc-300 bg-white rounded-md">
            <thead>
              <tr className="bg-zinc-800 text-white">
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Nome</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Senha Hash</th>
                <th className="px-4 py-2 border">Criado em</th>
                <th className="px-4 py-2 border">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-zinc-100 transition duration-200 text-center"
                >
                  <td className="px-2 py-1 border">{user.id}</td>
                  <td className="px-2 py-1 border">{user.name}</td>
                  <td className="px-2 py-1 border">{user.email}</td>
                  <td className="px-2 py-1 border text-xs break-all">
                    {user.password}
                  </td>
                  <td className="px-2 py-1 border">
                    {new Date(user.createdAt).toLocaleString("pt-BR")}
                  </td>
                  <td className="px-2 py-1 border flex gap-2 justify-center">
                    <button
                      onClick={() => handleEdit(user.id)}
                      className="text-blue-500 hover:text-blue-700 text-sm"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredUsers.length === 0 && (
            <p className="text-center text-zinc-500 mt-4">
              Nenhum usuário encontrado.
            </p>
          )}
        </div>
      </div>
    </PrivateRoute>
  );
}
