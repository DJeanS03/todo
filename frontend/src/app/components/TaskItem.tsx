import { FaRegTrashAlt } from "react-icons/fa";
import { LuPencil } from "react-icons/lu";
import { useTasks } from "../hooks/useTask";

export function RenderizarTasks() {
  const { tasks, alterarTaskStatus, obterTaskPorId, deletarTask } = useTasks();

  if (tasks.length === 0) {
    return <p>Não há tarefas</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center gap-4 bg-zinc-800 px-4 py-2 rounded-md justify-between"
        >
          <input
            type="checkbox"
            className="h-5 w-5 flex rounded-md border border-[#a2a1a833] light:bg-[#e8e8e8] dark:bg-[#212121] peer-checked:bg-[#7152f3] transition"
            checked={task.isCompleted}
            onChange={() =>
              task.id && alterarTaskStatus(task.id, !task.isCompleted)
            }
          />

          <span>{task.title}</span>
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
