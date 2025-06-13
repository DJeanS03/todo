"use client";
import { FaCheck, FaRegListAlt, FaRegTrashAlt } from "react-icons/fa";
import { LuPencil } from "react-icons/lu";
import { useTasks } from "../hooks/useTask";
import { IoIosFlag } from "react-icons/io";
import { useEffect, useState } from "react";
import TaskPrioritySelect from "./TaskPrioritySelect";
import ConfirmModal from "./ConfirmModal";
import { AnimatePresence, motion } from "framer-motion"; // ✨ Importar motion
import { Task } from "../types/Task";
import TaskDetailModal from "./TaskDetailModal";

import ReactMarkdown from "react-markdown";
//import { Tooltip } from "react-tooltip";

export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  description: string;
  showKeepCompletedCheckbox?: boolean;
  isCompletedChecked?: boolean;
  onCompletedChange?: (checked: boolean) => void;
}

export function RenderizarTasks() {
  const { tasks, alterarTaskStatus, deletarTask, editarTask } = useTasks();

  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [tempTitle, setTempTitle] = useState("");
  const [tempPriority, setTempPriority] = useState<
    "HIGH" | "MEDIUM" | "LOW" | "NONE"
  >("NONE");

  const [showModal, setShowModal] = useState(false);
  const [edicaoPendenteId, setEdicaoPendenteId] = useState<number | null>(null);
  const [shouldRemainCompleted, setShouldRemainCompleted] = useState(true);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setEditandoId(null);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

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

  const iniciarEdicao = (
    id: number,
    title: string,
    priority: "HIGH" | "MEDIUM" | "LOW" | "NONE"
  ) => {
    setEditandoId(id);
    setTempTitle(title);
    setTempPriority(priority);
    setShouldRemainCompleted(true);
  };

  const salvarEdicao = async (id: number) => {
    const taskOriginal = tasks.find((t) => t.id === id);
    if (!taskOriginal) return;

    if (taskOriginal.isCompleted) {
      setShowModal(true);
      setEdicaoPendenteId(id);
      return;
    }

    await editarTask({
      id,
      title: tempTitle,
      isCompleted: taskOriginal.isCompleted,
      priority: tempPriority,
    });

    setEditandoId(null);
  };

  const confirmarEdicaoComStatus = async () => {
    if (edicaoPendenteId === null) return;
    const taskOriginal = tasks.find((t) => t.id === edicaoPendenteId);
    if (!taskOriginal) return;

    await editarTask({
      id: edicaoPendenteId,
      title: tempTitle,
      isCompleted: shouldRemainCompleted,
      priority: tempPriority,
    });

    setEditandoId(null);
    setEdicaoPendenteId(null);
    setShowModal(false);
    setShouldRemainCompleted(true);
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

  const editVariants = {
    editing: {
      backgroundColor: "#3f3f46",
      scale: 1.02,
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
    notEditing: {
      backgroundColor: "#27272a",
      scale: 1,
      boxShadow: "none",
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  const handleOpenModal = (task: Task) => {
    setSelectedTask(task);
  };

  const handleSaveModal = async (updatedTask: Task) => {
    await editarTask(updatedTask);
    setSelectedTask(null);
  };

  return (
    <div className="flex flex-col gap-2">
      <AnimatePresence>
        {tasks.map((task) => {
          const isEditing = editandoId === task.id;
          return (
            <motion.div
              key={task.id}
              onClick={(e) => {
                if (
                  (e.target as HTMLElement).tagName !== "svg" &&
                  (e.target as HTMLElement).tagName !== "path"
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
              variants={isEditing ? editVariants : itemVariants}
              initial={isEditing ? false : "hidden"}
              animate={
                isEditing ? (isEditing ? "editing" : "notEditing") : "visible"
              }
              exit={isEditing ? undefined : "exit"}
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

              {isEditing ? (
                <div className="flex flex-col gap-1 flex-grow">
                  {" "}
                  <input
                    value={tempTitle}
                    onChange={(e) => setTempTitle(e.target.value)}
                    className={`bg-transparent border-b text-white px-1 py-0.5 focus:outline-none w-full
                      ${
                        task.isCompleted
                          ? "border-yellow-400 text-yellow-300"
                          : "border-zinc-400"
                      }`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && typeof task.id === "number") {
                        salvarEdicao(task.id);
                      }
                    }}
                  />
                  {task.isCompleted && (
                    <p className="text-yellow-400 text-xs italic">
                      * Essa tarefa já foi concluída. Edite com cautela.
                    </p>
                  )}
                </div>
              ) : (
                <span
                  className={`flex-grow flex items-center gap-1 ${
                    task.isCompleted
                      ? "line-through text-zinc-400"
                      : "text-white"
                  }`}
                >
                  {task.title}
                  {task.description && task.description.trim() !== "" && (
                    <div className="group relative">
                      <span
                        className="text-blue-400 text-xs cursor-pointer"
                        title="Possui descrição"
                      >
                        <FaRegListAlt size={15}/>
                      </span>

                      <div className="absolute hidden group-hover:flex flex-col bg-zinc-900 text-white p-3 rounded-md shadow-md z-50 w-64 top-6 left-1/2 -translate-x-1/2">
                        <div className="prose prose-sm prose-invert">
                          <ReactMarkdown>{task.description}</ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  )}
                </span>
              )}

              {isEditing ? (
                <TaskPrioritySelect
                  priority={tempPriority}
                  onChange={setTempPriority}
                />
              ) : (
                <IoIosFlag
                  className={`${getPriorityColor(task.priority)} text-xl`}
                />
              )}

              <div className="flex gap-2 items-center">
                {isEditing ? (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => task.id && salvarEdicao(task.id)}
                    className="text-green-400"
                  >
                    <FaCheck
                      className={`transition duration-300 ${
                        task.title.trim()
                          ? "text-zinc-400 hover:text-green-600 cursor-pointer"
                          : "text-green-400 opacity-50 cursor-not-allowed pointer-events-none"
                      }`}
                      title="Salvar Edição"
                    />
                  </motion.button>
                ) : (
                  <motion.div // ✨ Animação no ícone de lápis
                    whileHover={{ scale: 1.1, color: "#3b82f6" }} // text-blue-500
                    whileTap={{ scale: 0.9 }}
                    className="cursor-pointer"
                    onClick={() =>
                      task.id &&
                      iniciarEdicao(task.id, task.title, task.priority)
                    }
                  >
                    <LuPencil />
                  </motion.div>
                )}

                <motion.div // ✨ Animação no ícone de lixeira
                  whileHover={{ scale: 1.1, color: "#ef4444" }} // text-red-500
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

        {selectedTask && (
          <TaskDetailModal
            task={{
              ...selectedTask,
              id: selectedTask.id !== undefined ? String(selectedTask.id) : "",
            }}
            onClose={() => setSelectedTask(null)}
            onSave={async (updatedTask) => {
              await handleSaveModal({
                ...updatedTask,
                id:
                  typeof updatedTask.id === "string"
                    ? Number(updatedTask.id)
                    : updatedTask.id,
              });
              setSelectedTask(null);
            }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showModal && (
          <ConfirmModal
            isOpen={showModal}
            onClose={() => {
              setShowModal(false);
              setEdicaoPendenteId(null);
              setShouldRemainCompleted(true);
            }}
            onConfirm={confirmarEdicaoComStatus}
            title="Tarefa Concluída: Como proceder com a edição?"
            description="Esta tarefa está marcada como concluída. Você deseja mantê-la concluída ou ativá-la novamente após editar?"
            showKeepCompletedCheckbox={true}
            isCompletedChecked={shouldRemainCompleted}
            onCompletedChange={setShouldRemainCompleted}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* 
"use client";
import { FaCheck, FaRegTrashAlt } from "react-icons/fa";
import { LuPencil } from "react-icons/lu";
import { useTasks } from "../hooks/useTask";
import { IoIosFlag } from "react-icons/io";
import { useEffect, useState } from "react";
import TaskPrioritySelect from "./TaskPrioritySelect";
import ConfirmModal from "./ConfirmModal";

export function RenderizarTasks() {
  const { tasks, alterarTaskStatus, deletarTask, editarTask } = useTasks();

  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [tempTitle, setTempTitle] = useState("");
  const [tempPriority, setTempPriority] = useState<
    "HIGH" | "MEDIUM" | "LOW" | "NONE"
  >("NONE");

  const [showModal, setShowModal] = useState(false);
  const [edicaoPendenteId, setEdicaoPendenteId] = useState<number | null>(null);
  const [manterConcluida, setManterConcluida] = useState(true);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setEditandoId(null);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

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

  const iniciarEdicao = (
    id: number,
    title: string,
    priority: "HIGH" | "MEDIUM" | "LOW" | "NONE"
  ) => {
    setEditandoId(id);
    setTempTitle(title);
    setTempPriority(priority);
  };

  const salvarEdicao = async (id: number) => {
    const taskOriginal = tasks.find((t) => t.id === id);
    if (!taskOriginal) return;

    if (taskOriginal.isCompleted) {
      setShowModal(true);
      setEdicaoPendenteId(id);
      return;
    }

    await editarTask({
      id,
      title: tempTitle,
      isCompleted: taskOriginal.isCompleted,
      priority: tempPriority,
    });

    setEditandoId(null);
  };

  const confirmarEdicaoComStatus = async () => {
    if (edicaoPendenteId === null) return;
    const taskOriginal = tasks.find((t) => t.id === edicaoPendenteId);
    if (!taskOriginal) return;

    await editarTask({
      id: edicaoPendenteId,
      title: tempTitle,
      isCompleted: manterConcluida ? true : false,
      priority: tempPriority,
    });

    setEditandoId(null);
    setEdicaoPendenteId(null);
    setShowModal(false);
  };

  return (
    <div className="flex flex-col gap-2">
      {tasks.map((task) => {
        const isEditing = editandoId === task.id;
        return (
          <div
            key={task.id}
            className={`flex items-center gap-4 px-4 py-2 rounded-md justify-between transition-opacity duration-300 ${
              task.isCompleted ? "bg-zinc-600 opacity-60" : "bg-zinc-800"
            }`}
          >
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-500 focus:ring-blue-500 transition duration-300"
              checked={task.isCompleted}
              onChange={() =>
                task.id && alterarTaskStatus(task.id, !task.isCompleted)
              }
            />

            {isEditing ? (
              <div className="flex flex-col gap-1">
                <input
                  value={tempTitle}
                  onChange={(e) => setTempTitle(e.target.value)}
                  className={`bg-transparent border-b text-white px-1 py-0.5 focus:outline-none ${
                    task.isCompleted
                      ? "border-yellow-400 text-yellow-300"
                      : "border-zinc-400"
                  }`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && typeof task.id === "number") {
                      salvarEdicao(task.id);
                    }
                  }}
                />

                {task.isCompleted && (
                  <p className="text-yellow-400 text-xs italic">
                    * Essa tarefa já foi concluída. Edite com cautela.
                  </p>
                )}
              </div>
            ) : (
              <span
                className={`${
                  task.isCompleted ? "line-through text-zinc-400" : "text-white"
                }`}
              >
                {task.title}
                {task.description && task.description.trim() !== "" && (
                  <span
                    className="text-blue-400 text-xs cursor-pointer"
                    title="Possui descrição"
                  >
                    📄
                  </span>
                )}
              </span>
            )}

            {isEditing ? (
              <TaskPrioritySelect
                priority={tempPriority}
                onChange={setTempPriority}
              />
            ) : (
              <IoIosFlag
                className={`${getPriorityColor(task.priority)} text-xl`}
              />
            )}

            <div className="flex gap-2 items-center">
              {isEditing ? (
                <button
                  onClick={() => task.id && salvarEdicao(task.id)}
                  className="text-green-400"
                >
                  <FaCheck
                    className={`transition duration-300 ${
                      task.title.trim()
                        ? "text-green-400 hover:text-green-600 cursor-pointer"
                        : "text-green-400 opacity-50 cursor-not-allowed pointer-events-none"
                    }`}
                    onClick={() => task.id && salvarEdicao(task.id)}
                    title="Salvar Edição"
                  />
                </button>
              ) : (
                <LuPencil
                  className="hover:text-blue-500 transition duration-300"
                  onClick={() =>
                    task.id && iniciarEdicao(task.id, task.title, task.priority)
                  }
                />
              )}

              <FaRegTrashAlt
                className="hover:text-red-500 transition duration-300"
                onClick={() => task.id && deletarTask(task.id)}
              />
            </div>
          </div>
        );
      })}
      <ConfirmModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEdicaoPendenteId(null);
        }}
        onConfirm={async () => {
          setManterConcluida(false);
          await confirmarEdicaoComStatus();
        }}
        title="Deseja ativar a tarefa com essa edição?"
        description="Essa tarefa está marcada como concluída. Deseja ativá-la após editar?"
      />
    </div>
  );
}
 */
