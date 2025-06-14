// components/ConfirmModal.tsx
"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void; // Ação ao confirmar
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
  title = "Confirmar Alterações",
  description = "Você tem certeza que deseja prosseguir com as alterações?",
  showKeepCompletedCheckbox,
  isCompletedChecked,
  onCompletedChange,
}: ConfirmModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} // Fecha o modal ao clicar fora
        >
          <motion.div
            className="bg-zinc-900 text-white p-6 rounded-lg max-w-sm w-full shadow-lg"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()} // Impede que o clique interno feche o modal
          >
            <h2 className="text-lg font-semibold mb-2">{title}</h2>
            <p className="text-sm mb-4">{description}</p>

            {showKeepCompletedCheckbox && (
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="keepCompleted"
                  className="form-checkbox h-4 w-4 text-blue-500 focus:ring-blue-500"
                  checked={isCompletedChecked}
                  onChange={(e) =>
                    onCompletedChange && onCompletedChange(e.target.checked)
                  }
                />
                <label htmlFor="keepCompleted" className="ml-2 text-sm text-zinc-300">
                  Manter como concluída
                </label>
              </div>
            )}

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
                Confirmar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}