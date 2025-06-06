"use client";
import React from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Deseja ativar a tarefa?",
  description = "Essa tarefa está marcada como concluída. Deseja ativá-la novamente após editar?",
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50">
      <div className="bg-zinc-900 text-white p-6 rounded-lg max-w-sm w-full shadow-lg">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-sm mb-4">{description}</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-zinc-700 px-4 py-2 rounded hover:bg-zinc-600 transition"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Sim, ativar
          </button>
        </div>
      </div>
    </div>
  );
}
