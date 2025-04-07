import { FaRegTrashAlt } from "react-icons/fa";
import { LuPencil } from "react-icons/lu";
import { useTasks } from "../hooks/useTask";
import { IoIosFlag } from "react-icons/io";

export function RenderizarTasks() {
  const { tasks, alterarTaskStatus, obterTaskPorId, deletarTask } = useTasks();

  if (tasks.length === 0) {
    return <p>Não há tarefas</p>;
  }

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

  return (
    <div className="flex flex-col gap-2">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`flex items-center gap-4  px-4 py-2 rounded-md justify-between transition-opacity duration-300 ${
            task.isCompleted ? "bg-zinc-600 opacity-60" : "bg-zinc-800"
          }`}
        >
          <input
            type="checkbox"
            className="h-5 w-5 flex rounded-md border border-[#a2a1a833] light:bg-[#e8e8e8] dark:bg-[#212121] peer-checked:bg-[#7152f3] transition"
            checked={task.isCompleted}
            onChange={() =>
              task.id && alterarTaskStatus(task.id, !task.isCompleted)
            }
            onClick={() =>
              task.id && alterarTaskStatus(task.id, !task.isCompleted)
            }
          />

          <span className={`${task.isCompleted ? "line-through" : ""}`}>
            {task.title}
          </span>

          <span>
            <IoIosFlag
              className={`${getPriorityColor(task.priority)} text-xl`}
            />
          </span>

          <div className="flex gap-2 items-center">
            <LuPencil
              className="hover:text-blue-500 transition duration-300"
              onClick={() => task.id && obterTaskPorId(task.id)}
            />

            <FaRegTrashAlt
              className="hover:text-red-500 transition duration-300"
              onClick={() => task.id && deletarTask(task.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
