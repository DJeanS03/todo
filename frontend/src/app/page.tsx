"use client";

import { RenderizarFormTask } from "./components/tasks/TasksForm";
import { RenderizarTasks } from "./components/tasks/TaskItem";
import { useTasks, TasksProvider } from "./hooks/useTask";
import { FaTasks } from "react-icons/fa";
//import { ToasterProvider } from "./components/ToasterProvider";
import { Toaster } from "react-hot-toast";

function MainContent() {
  const { tasks, sortType, setSortType } = useTasks();

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-10 gap-8 bg-gray-50">
      <RenderizarFormTask />
      <Toaster position="top-right" />

      <div className="flex flex-col md:flex-row gap-4 items-center justify-center bg-white p-4 rounded-lg shadow-md border border-zinc-200 w-full max-w-xl">
        {/* Ordem de exibição */}
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

        {/* Tarefas concluídas */}
        <div className="flex items-center gap-2">
          <p className="font-medium text-zinc-700">Tarefas Concluídas:</p>
          <span className="bg-zinc-800 text-white px-3 py-1 rounded-md text-sm font-semibold">
            {tasks.filter((task) => task.isCompleted).length} de {tasks.length}
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

export default function Home() {
  return (
    //<ToasterProvider>
    <TasksProvider>
      <MainContent />
    </TasksProvider>
    //</ToasterProvider>
  );
}
