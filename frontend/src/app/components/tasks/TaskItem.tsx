"use client";
import { FaRegListAlt, FaRegTrashAlt } from "react-icons/fa";
import { LuPencil } from "react-icons/lu";
import { useTasks } from "../../hooks/useTask";
import { IoIosFlag } from "react-icons/io";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Task } from "../../types/Task";
import TaskDetailModal from "../modals/TaskDetailModal";

import ReactMarkdown from "react-markdown";

export function RenderizarTasks() {
  const { tasks, alterarTaskStatus, deletarTask, editarTask } = useTasks();

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const getPriorityColor = (
    priority: "HIGH" | "MEDIUM" | "LOW" | "NONE" | undefined
  ) => {
    switch (priority) {
      case "HIGH":
        return "text-red-500";
      case "MEDIUM":
        return "text-yellow-500";
      case "LOW":
        return "text-blue-500";
      default:
        return "text-zinc-500";
    }
  };

  const handleOpenModal = (task: Task) => {
    setSelectedTask(task);
  };

  // A função handleSaveModal agora só precisa chamar editarTask
  const handleSaveModal = async (updatedTask: Task) => {
    await editarTask(updatedTask);
    setSelectedTask(null);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  return (
    <div className="flex flex-col gap-2">
      <AnimatePresence>
        {tasks.map((task) => {
          return (
            <motion.div
              key={task.id}
              onClick={(e) => {
                if (
                  (e.target as HTMLElement).tagName !== "svg" &&
                  (e.target as HTMLElement).tagName !== "path" &&
                  (e.target as HTMLElement).tagName !== "INPUT" // Adicionado para evitar abrir o modal ao clicar no checkbox
                ) {
                  handleOpenModal(task);
                }
              }}
              className={`flex items-center gap-4 px-4 py-2 rounded-md justify-between 
                        ${
                          task.isCompleted
                            ? "bg-zinc-600 opacity-80"
                            : "bg-zinc-800"
                        }`}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-500 focus:ring-blue-500 transition duration-300"
                checked={task.isCompleted}
                onChange={() =>
                  task.id && alterarTaskStatus(task.id, !task.isCompleted)
                }
              />

              <span
                className={`flex-grow flex items-center gap-1 ${
                  task.isCompleted ? "line-through text-zinc-400" : "text-white"
                }`}
              >
                {task.title}
                {task.description && task.description.trim() !== "" && (
                  <div className="group relative">
                    <span
                      className="text-blue-400 text-xs cursor-pointer"
                      title="Possui descrição"
                    >
                      <FaRegListAlt size={15} />
                    </span>

                    <div className="absolute hidden group-hover:flex flex-col bg-zinc-900 text-white p-3 rounded-md shadow-md z-50 w-64 top-6 left-1/2 -translate-x-1/2">
                      <div className="prose prose-sm prose-invert">
                        <ReactMarkdown>{task.description}</ReactMarkdown>
                      </div>
                    </div>
                  </div>
                )}
              </span>

              <IoIosFlag
                className={`${getPriorityColor(task.priority)} text-xl`}
              />

              <div className="flex gap-2 items-center">
                <motion.div
                  whileHover={{ scale: 1.1, color: "#3b82f6" }}
                  whileTap={{ scale: 0.9 }}
                  className="cursor-pointer"
                  onClick={() => task.id && handleOpenModal(task)}
                >
                  <LuPencil />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.1, color: "#ef4444" }}
                  whileTap={{ scale: 0.9 }}
                  className="cursor-pointer"
                  onClick={() => task.id && deletarTask(task.id)}
                >
                  <FaRegTrashAlt />
                </motion.div>
              </div>
            </motion.div>
          );
        })}

        <AnimatePresence>
          {selectedTask && (
            <TaskDetailModal
              task={{
                ...selectedTask,
                id: String(selectedTask.id), // Garantir que id seja string para TaskDetailModal
              }}
              onClose={() => setSelectedTask(null)}
              onSave={async (updatedTask) => {
                await handleSaveModal({
                  ...updatedTask,
                  id: Number(updatedTask.id), // Converte id de volta para number antes de salvar
                });
                setSelectedTask(null);
              }}
            />
          )}
        </AnimatePresence>
      </AnimatePresence>
    </div>
  );
}