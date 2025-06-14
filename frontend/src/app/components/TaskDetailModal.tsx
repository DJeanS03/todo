// components/TaskDetailModal.tsx
import { useEffect, useState } from "react";
import { FaRegTimesCircle } from "react-icons/fa";
import TaskPrioritySelect from "./TaskPrioritySelect";
import ConfirmModal from "./ConfirmModal"; // Importar o ConfirmModal
import { AnimatePresence } from "framer-motion";

interface Task {
  id: string; // Mantido como string no modal para consistência
  title: string;
  description?: string;
  priority: "NONE" | "LOW" | "MEDIUM" | "HIGH";
  isCompleted: boolean;
}

export default function TaskDetailModal({
  task,
  onClose,
  onSave,
}: {
  task: Task;
  onClose: () => void;
  onSave: (updatedTask: Task) => void;
}) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [priority, setPriority] = useState(task.priority);
  const [isCompleted, setIsCompleted] = useState(task.isCompleted);

  // Estados para o ConfirmModal
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [shouldRemainCompleted, setShouldRemainCompleted] = useState(task.isCompleted);

  // Fechar modal com a tecla Esc
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Função auxiliar para verificar se houve alterações significativas
  const hasSignificantChanges = () => {
    return (
      title !== task.title ||
      description !== (task.description || "") ||
      priority !== task.priority
    );
  };

  const handleSave = () => {
    const originalIsCompleted = task.isCompleted;

    // Cenário 1: Tarefa estava concluída
    if (originalIsCompleted) {
      // Se houve qualquer alteração no título/descrição/prioridade OU
      // se o usuário desmarcou o checkbox de concluída no modal
      if (hasSignificantChanges() || isCompleted !== originalIsCompleted) {
        setShowConfirmModal(true);
        // O isCompleted no modal de confirmação começará com o valor atual do checkbox
        setShouldRemainCompleted(isCompleted);
      } else {
        // Nenhuma alteração significativa ou o status de concluída não mudou, salva diretamente
        onSave({
          ...task,
          title,
          description,
          priority,
          isCompleted,
        });
        onClose();
      }
    }
    // Cenário 2: Tarefa não estava concluída, mas agora está marcada como concluída
    else if (!originalIsCompleted && isCompleted) {
      setShowConfirmModal(true);
      setShouldRemainCompleted(true); // Default para manter como concluída ao finalizar
    }
    // Cenário 3: Tarefa não estava concluída e continua não concluída (ou foi desmarcada)
    // ou nenhuma alteração em tarefa que não era concluída
    else {
      onSave({
        ...task,
        title,
        description,
        priority,
        isCompleted,
      });
      onClose();
    }
  };

  const confirmSave = () => {
    onSave({
      ...task,
      title,
      description,
      priority,
      isCompleted: shouldRemainCompleted, // Usa a decisão do usuário do ConfirmModal
    });
    setShowConfirmModal(false);
    onClose();
  };

  const cancelConfirmModal = () => {
    setShowConfirmModal(false);
    // Não precisa chamar onClose() aqui, pois o TaskDetailModal permanece aberto
  };


  return (
    <>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-zinc-900 p-6 rounded-lg w-full max-w-md shadow-md flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl text-white">Detalhes da Tarefa</h2>
            <FaRegTimesCircle
              className="text-zinc-400 hover:text-red-500 cursor-pointer"
              size={20}
              onClick={onClose}
            />
          </div>

          {/* Sinalização de tarefa concluída dentro do modal */}
          {task.isCompleted && (
            <p className="text-yellow-400 text-sm italic">
              Esta tarefa já foi concluída. Edite com cautela.
            </p>
          )}

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-500 focus:ring-blue-500 transition duration-300"
              checked={isCompleted}
              onChange={() => setIsCompleted(!isCompleted)}
            />
            <input
              type="text"
              className="bg-neutral-800 px-3 py-2 rounded-md w-full text-white"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TaskPrioritySelect
              priority={priority}
              onChange={setPriority}
            />
          </div>

          <textarea
            className="bg-neutral-800 px-3 py-2 rounded-md w-full resize-none h-28 text-white"
            placeholder="Descrição da tarefa"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="bg-zinc-700 px-4 py-2 rounded-md hover:bg-zinc-600 text-white"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showConfirmModal && (
          <ConfirmModal
            isOpen={showConfirmModal}
            onClose={cancelConfirmModal}
            onConfirm={confirmSave}
            title={
              task.isCompleted && !isCompleted
                ? "Reativar Tarefa?"
                : task.isCompleted
                ? "Tarefa Concluída: Como proceder com a edição?"
                : "Finalizar Tarefa?"
            }
            description={
              task.isCompleted && !isCompleted
                ? "Você marcou esta tarefa como não concluída. Deseja reativá-la e salvar as alterações?"
                : task.isCompleted
                ? "Esta tarefa já foi concluída. Deseja mantê-la concluída ou reativá-la com as novas edições?"
                : "Você está marcando esta tarefa como concluída. Deseja finalizar e salvar?"
            }
            showKeepCompletedCheckbox={true}
            isCompletedChecked={shouldRemainCompleted}
            onCompletedChange={setShouldRemainCompleted}
          />
        )}
      </AnimatePresence>
    </>
  );
}