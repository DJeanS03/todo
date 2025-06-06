"use client";
import { FaCheck, FaRegTrashAlt } from "react-icons/fa";
import { LuPencil } from "react-icons/lu";
import { useTasks } from "../hooks/useTask";
import { IoIosFlag } from "react-icons/io";
import { useEffect, useState } from "react";
import TaskPrioritySelect from "./TaskPrioritySelect";
import ConfirmModal from "./ConfirmModal";

export function RenderizarTasks() {
  const { tasks, alterarTaskStatus, deletarTask, editarTask } =
    useTasks();

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
          setManterConcluida(false); // Define para ativar a tarefa
          await confirmarEdicaoComStatus();
        }}
        title="Deseja ativar a tarefa com essa edição?"
        description="Essa tarefa está marcada como concluída. Deseja ativá-la após editar?"
      />
    </div>
  );
}
