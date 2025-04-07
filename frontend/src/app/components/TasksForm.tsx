import { IoIosFlag } from "react-icons/io";
import { useTasks } from "../hooks/useTask";
import TaskPrioritySelect from "./TaskPrioritySelect";

export function RenderizarFormTask() {
  const { task, setTask, criarTask, editarTask } = useTasks();

  return (
    <div className="flex gap-2 items-center">
      <TaskPrioritySelect />
      <input
        type="text"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
        placeholder="Tarefa"
        className="border border-zinc-800 px-2 py-1 rounded-md"
      />

      <select
        value={task.priority}
        onChange={(e) =>
          setTask({
            ...task,
            priority: e.target.value as "NONE" | "LOW" | "MEDIUM" | "HIGH",
          })
        }
        className="border border-zinc-800 px-2 py-1 rounded-md"
      >
        <option value="NONE">
          <IoIosFlag className="text-zinc  -500" />
        </option>
        <option value="LOW">Baixa</option>
        <option value="MEDIUM">Média</option>
        <option value="HIGH">Alta</option>
      </select>

      {task.id ? (
        <button
          onClick={editarTask}
          className="bg-blue-600 px-2 py-1 rounded-md text-white"
        >
          Editar
        </button>
      ) : (
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
