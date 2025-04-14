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
      />

      <TaskPrioritySelect />

      {!task.id && (
  <button
    onClick={criarTask}
    className="bg-zinc-800 px-2 py-1 rounded-md text-white"
  >
    Criar
  </button>
)}

    </div>
  );
}
