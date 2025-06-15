import { useEffect, useState } from "react";
import { FaRegTimesCircle } from "react-icons/fa";
import TaskPrioritySelect from "../tasks/TaskPrioritySelect";
import ConfirmModal from "./ConfirmModal";
import { AnimatePresence, motion } from "framer-motion"; // ✨ Importar motion e AnimatePresence
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";

interface Task {
  id: string;
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
  const [shouldRemainCompleted, setShouldRemainCompleted] = useState(
    task.isCompleted
  );

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
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 500,
        delay: 0.1,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2 },
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
      >
        <motion.div
          className="bg-zinc-900 p-6 rounded-lg w-full max-w-md shadow-md flex flex-col gap-4"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl text-white">Detalhes da Tarefa</h2>
            <FaRegTimesCircle
              className="text-zinc-400 hover:text-red-500 cursor-pointer"
              size={20}
              onClick={onClose}
            />
          </div>

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
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título da tarefa"
            />
            <TaskPrioritySelect priority={priority} onChange={setPriority} />
          </div>

          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descrição detalhada da tarefa"
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
        </motion.div>
      </motion.div>

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
    </AnimatePresence>
  );
}
