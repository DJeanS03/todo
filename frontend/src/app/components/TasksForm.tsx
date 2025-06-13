import { useRef, useState } from "react";
import { useTasks } from "../hooks/useTask";
import { ExportTasks } from "./ExportTasks";
import TaskPrioritySelect from "./TaskPrioritySelect";

export function RenderizarFormTask() {
  const { task, setTask, criarTask } = useTasks();
  const [showDescription, setShowDescription] = useState(false);
  const descInputRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
        placeholder="Tarefa"
        className="border border-zinc-800 px-2 py-1 rounded-md"
        onKeyDown={(e) => {
          if (e.shiftKey && e.key === "Enter") {
            e.preventDefault();
            setShowDescription(true);
            setTimeout(() => descInputRef.current?.focus(), 100);
            return;
          }

          if (e.key === "Enter") {
            criarTask();
            (
              window as Window & {
                showToast?: (title: string, message: string) => void;
              }
            ).showToast?.("Tarefa criada", "Sua nova tarefa foi adicionada.");

            setTask({
              title: "",
              description: "",
              isCompleted: false,
              priority: "NONE",
            });
            setShowDescription(false);
          }
        }}
      />
      {showDescription && (
        <textarea
          ref={descInputRef}
          value={task.description || ""}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          placeholder="Descrição da tarefa"
          className="border border-zinc-800 px-2 py-1 rounded-md w-full"
        />
      )}

      <TaskPrioritySelect
        priority={task.priority}
        onChange={(newPriority) => setTask({ ...task, priority: newPriority })}
      />

      {!task.id && (
        <button
          onClick={() => {
            criarTask();
            (
              window as Window & {
                showToast?: (title: string, message: string) => void;
              }
            ).showToast?.("Tarefa criada", "Sua nova tarefa foi adicionada.");
            setTask({
              title: "",
              description: "",
              isCompleted: false,
              priority: "NONE",
            });
            setShowDescription(false);
          }}
          disabled={!task.title.trim()}
          className={`px-2 py-1 rounded-md text-white transition-colors duration-300
            ${
              task.title.trim()
                ? "bg-zinc-800 hover:bg-zinc-700 cursor-pointer"
                : "bg-zinc-400 cursor-not-allowed"
            }`}
        >
          Criar
        </button>
      )}
      <div>
        <ExportTasks />
      </div>
    </div>
  );
}
