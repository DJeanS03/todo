"use client";

import { RenderizarFormTask } from "./components/TasksForm";
import { RenderizarTasks } from "./components/TaskItem";
import { useTasks, TasksProvider } from "./hooks/useTask";

function MainContent() {
  const { tasks, sortType, setSortType } = useTasks();

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-10">
      <RenderizarFormTask />
      
      <select
        value={sortType}
        onChange={(e) =>
          setSortType(e.target.value as "PRIORITY" | "ALPHABETICAL")
        }
        className="border border-zinc-800 px-2 py-1 rounded-md"
      >
        <option value="PRIORITY">Por prioridade</option>
        <option value="ALPHABETICAL">Ordem alfabética</option>
      </select>

      <div className="flex gap-2 items-center">
        <p>Concluídas</p>
        <p className="bg-zinc-800 px-2 py-1 rounded-md text-white">
          {tasks.filter((task) => task.isCompleted).length} de {tasks.length}
        </p>
      </div>
      <RenderizarTasks />
    </div>
  );
}

export default function Home() {
  return (
    <TasksProvider>
      <MainContent />
    </TasksProvider>
  );
}
