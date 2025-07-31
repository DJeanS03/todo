"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import AdminRoute from "@/app/components/routes/AdminRoute";
import { useCallback } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function UsersPage() {
  const { token } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editedData, setEditedData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const fetchUsers = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/auth/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Acesso negado.");
      }

      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
      toast.error("Você não tem permissão para acessar.");
      router.push("/dashboard");
    }
  }, [token, router]);

  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, [token, fetchUsers]);

  const handleDelete = async (id: number) => {
    const confirm = window.confirm(
      "Tem certeza que deseja excluir este usuário?"
    );
    if (!confirm) return;

    await fetch(`${API_URL}/auth/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success("Usuário deletado.");
    fetchUsers();
  };

  const startEdit = (user: User) => {
    setEditingUser(user);
    setEditedData({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
    });
  };

  const handleEditSave = async () => {
    await fetch(`${API_URL}/auth/users/${editingUser?.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: editedData.name,
        email: editedData.email,
        password: editedData.password || undefined,
        role: editedData.role,
      }),
    });

    toast.success("Usuário atualizado.");
    setEditingUser(null);
    fetchUsers();
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminRoute>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Painel de Usuários</h1>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Buscar por nome ou email"
            className="border px-3 py-2 rounded-md w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <table className="w-full border border-zinc-300">
          <thead>
            <tr className="bg-zinc-800 text-white">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Nome</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Criado em</th>
              <th className="p-2 border">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.id} className="text-center">
                <td className="p-2 border">{u.id}</td>
                <td className="p-2 border">{u.name}</td>
                <td className="p-2 border">{u.email}</td>
                <td className="p-2 border">{u.role}</td>
                <td className="p-2 border">
                  {new Date(u.createdAt).toLocaleDateString("pt-BR")}
                </td>
                <td className="p-2 border flex justify-center gap-2">
                  <button
                    onClick={() => startEdit(u)}
                    className="bg-blue-600 text-white px-2 py-1 rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(u.id)}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editingUser && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-zinc-900 p-6 rounded-lg w-full max-w-md shadow-md">
              <h2 className="text-xl text-white mb-4">Editar Usuário</h2>

              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Nome"
                  className="bg-neutral-800 px-3 py-2 rounded-md text-white"
                  value={editedData.name}
                  onChange={(e) =>
                    setEditedData({ ...editedData, name: e.target.value })
                  }
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="bg-neutral-800 px-3 py-2 rounded-md text-white"
                  value={editedData.email}
                  onChange={(e) =>
                    setEditedData({ ...editedData, email: e.target.value })
                  }
                />
                <input
                  type="password"
                  placeholder="Nova senha (opcional)"
                  className="bg-neutral-800 px-3 py-2 rounded-md text-white"
                  value={editedData.password}
                  onChange={(e) =>
                    setEditedData({ ...editedData, password: e.target.value })
                  }
                />
                <select
                  className="bg-neutral-800 px-3 py-2 rounded-md text-white"
                  value={editedData.role}
                  onChange={(e) =>
                    setEditedData({ ...editedData, role: e.target.value })
                  }
                >
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setEditingUser(null)}
                  className="bg-zinc-600 px-4 py-2 rounded-md hover:bg-zinc-500"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleEditSave}
                  className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminRoute>
  );
}
