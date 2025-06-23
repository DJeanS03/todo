"use client";

import { RenderizarFormTask } from "../components/tasks/TasksForm";
import { RenderizarTasks } from "../components/tasks/TaskItem";
import { useTasks } from "../hooks/useTask";
import { Toaster } from "react-hot-toast";
import { FaTasks } from "react-icons/fa";

export default function DashboardPage() {
  const { tasks, sortType, setSortType } = useTasks();

  return (
    <div className="flex flex-col gap-8">
      <Toaster position="top-right" />
      <div className="flex justify-center">
        <RenderizarFormTask />
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg shadow-md border border-zinc-200">
        <div className="flex items-center gap-2">
          <p className="font-medium text-zinc-700">Ordem:</p>
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
          <p className="font-medium text-zinc-700">Tarefas Concluídas:</p>
          <span className="bg-zinc-800 text-white px-3 py-1 rounded-md text-sm font-semibold">
            {
              tasks.filter((task: { isCompleted: boolean }) => task.isCompleted)
                .length
            }{" "}
            de {tasks.length}
          </span>
        </div>
      </div>

      {tasks.length === 0 ? (
        <p className="text-zinc-500 text-center mt-8 flex flex-col items-center gap-3">
          <FaTasks size={40} />
          Nenhuma tarefa cadastrada ainda.
        </p>
      ) : (
        <RenderizarTasks />
      )}
    </div>
  );
}
