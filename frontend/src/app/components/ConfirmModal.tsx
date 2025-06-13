"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  showKeepCompletedCheckbox?: boolean; 
  isCompletedChecked?: boolean;       
  onCompletedChange?: (checked: boolean) => void; 
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Deseja ativar a tarefa?",
  description = "Essa tarefa está marcada como concluída. Deseja ativá-la novamente após editar?",
}: ConfirmModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} // Optional: Close modal when clicking outside
        >
          <motion.div
            className="bg-zinc-900 text-white p-6 rounded-lg max-w-sm w-full shadow-lg"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
          >
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}