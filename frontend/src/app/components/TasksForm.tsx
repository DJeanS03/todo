import { useTasks } from "../hooks/useTask";

export function RenderizarFormTask() {
  const { task, setTask, criarTask, editarTask } = useTasks();

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={task.title}
        onChange={(e) =>
          setTask({
            ...task,
            title: e.target.value,
            isCompleted: false,
          })
        }
        placeholder="Tarefa"
        className="border border-zinc-800 px-2 py-1 rounded-md"
      />
      <div>
        {task.id ? (
          <button
            onClick={editarTask}
            className="bg-zinc-800 px-2 py-1 rounded-md text-white"
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
    </div>
  );
}
