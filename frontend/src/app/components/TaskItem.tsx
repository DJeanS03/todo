"use client";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuPencil } from "react-icons/lu";
import { useTasks } from "../hooks/useTask";
import { IoIosFlag } from "react-icons/io";
import { useState } from "react";

export function RenderizarTasks() {
  const { tasks, alterarTaskStatus, deletarTask, editarTask, setTask } =
    useTasks();

  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [tempTitle, setTempTitle] = useState("");
  const [tempPriority, setTempPriority] = useState<
    "HIGH" | "MEDIUM" | "LOW" | "NONE"
  >("NONE");

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

    setTask({
      id,
      title: tempTitle,
      isCompleted: taskOriginal.isCompleted,
      priority: tempPriority,
    });

    await editarTask({
      id,
      title: tempTitle,
      isCompleted: false,
      priority: tempPriority,
    });

    setEditandoId(null);
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
              className="h-5 w-5"
              checked={task.isCompleted}
              onChange={() =>
                task.id && alterarTaskStatus(task.id, !task.isCompleted)
              }
            />

            {isEditing ? (
              <input
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                className="bg-transparent border-b border-zinc-400 text-white"
              />
            ) : (
              <span className={`${task.isCompleted ? "line-through" : ""}`}>
                {task.title}
              </span>
            )}

            {isEditing ? (
              <select
                value={tempPriority}
                onChange={(e) =>
                  setTempPriority(
                    e.target.value as "HIGH" | "MEDIUM" | "LOW" | "NONE"
                  )
                }
                className="bg-zinc-700 text-white px-1 rounded"
              >
                <option value="NONE">Nenhuma</option>
                <option value="LOW">Baixa</option>
                <option value="MEDIUM">Média</option>
                <option value="HIGH">Alta</option>
              </select>
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
                  OK
                </button>
              ) : (
                <LuPencil
                  className="hover:text-blue-500 transition duration-300"
                  onClick={() =>
                    task.id &&
                    iniciarEdicao(task.id, task.title, task.priority)
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
    </div>
  );
}
