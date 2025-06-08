import { useTasks } from "../hooks/useTask";
import TaskPrioritySelect from "./TaskPrioritySelect";

export function RenderizarFormTask() {
  const { task, setTask, criarTask } = useTasks();

  return (
    <div className="flex gap-2 items-center">
      <input
        type="text"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
        placeholder="Tarefa"
        className="border border-zinc-800 px-2 py-1 rounded-md"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            criarTask();
            (window as Window & { showToast?: (title: string, message: string) => void }).showToast?.(
              "Tarefa criada",
              "Sua nova tarefa foi adicionada."
            );
          }
        }}
      />

      <TaskPrioritySelect
        priority={task.priority}
        onChange={(newPriority) => setTask({ ...task, priority: newPriority })}
      />

      {!task.id && (
        <button
          onClick={criarTask}
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
    </div>
  );
}
