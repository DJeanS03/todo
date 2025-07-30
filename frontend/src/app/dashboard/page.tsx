"use client";

import { useState } from "react";
import { RenderizarFormTask } from "../components/tasks/TasksForm";
import { RenderizarTasks } from "../components/tasks/TaskItem";
import { useTasks } from "../hooks/useTask";
import { Toaster } from "react-hot-toast";
import { FaTasks } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function DashboardPage() {
  const { tasks, sortType, setSortType } = useTasks();
  const [showCompleted, setShowCompleted] = useState(false);

  const completedTasks = tasks.filter((t) => t.isCompleted);
  const activeTasks = tasks.filter((t) => !t.isCompleted);

  return (
    <div className="flex flex-col gap-8">
      <Toaster position="top-right" />
      <div className="flex justify-center">
        <RenderizarFormTask />
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between text-white bg-zinc-900 p-4 rounded-lg shadow-md">
        <div className="flex items-center gap-2">
          <p className="font-medium">Ordem:</p>
          <select
            value={sortType}
            onChange={(e) =>
              setSortType(e.target.value as "PRIORITY" | "ALPHABETICAL")
            }
            className="border border-zinc-300 px-3 py-1 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-zinc-600"
          >
            <option value="PRIORITY">Por prioridade</option>
            <option value="ALPHABETICAL">Ordem alfabética</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <p className="font-medium">Tarefas Concluídas:</p>
          <span className="bg-zinc-800 text-white px-3 py-1 rounded-md text-sm font-semibold">
            {completedTasks.length} de {tasks.length}
          </span>
        </div>
      </div>

      {/* Tarefas ativas */}
      {activeTasks.length === 0 ? (
        <p className="text-zinc-500 text-center mt-8 flex flex-col items-center gap-3">
          <FaTasks size={40} />
          Nenhuma tarefa ativa.
        </p>
      ) : (
        <RenderizarTasks tasks={activeTasks} />
      )}

      {/* Toggle de tarefas concluídas */}
      {completedTasks.length > 0 && (
        <div className="mt-4">
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-300 transition"
          >
            {showCompleted ? (
              <>
                <IoIosArrowUp /> Ocultar tarefas concluídas
              </>
            ) : (
              <>
                <IoIosArrowDown /> Mostrar tarefas concluídas ({completedTasks.length})
              </>
            )}
          </button>

          {showCompleted && (
            <div className="mt-4">
              <RenderizarTasks tasks={completedTasks} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
