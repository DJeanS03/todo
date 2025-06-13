import { useState } from "react";
import { FaRegTimesCircle } from "react-icons/fa";

interface Task {
  id: string;
  title: string;
  description?: string;
  priority: "NONE" | "LOW" | "MEDIUM" | "HIGH";
  isCompleted: boolean;
}

export default function TaskDetailModal({
  task,
  onClose,
  onSave,
}: {
  task: Task;
  onClose: () => void;
  onSave: (updatedTask: Task) => void;
}) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [priority, setPriority] = useState(task.priority);
  const [isCompleted, setIsCompleted] = useState(task.isCompleted);

  const handleSave = () => {
    onSave({
      ...task,
      title,
      description,
      priority,
      isCompleted,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-zinc-900 p-6 rounded-lg w-full max-w-md shadow-md flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl text-white">Detalhes da Tarefa</h2>
          <FaRegTimesCircle
            className="text-zinc-400 hover:text-red-500 cursor-pointer"
            size={20}
            onClick={onClose}
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={() => setIsCompleted(!isCompleted)}
          />
          <input
            type="text"
            className="bg-neutral-800 px-3 py-2 rounded-md w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <select
            className="bg-neutral-800 px-2 py-2 rounded-md"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Task["priority"])}
          >
            <option value="NONE">Sem prioridade</option>
            <option value="LOW">Baixa</option>
            <option value="MEDIUM">Média</option>
            <option value="HIGH">Alta</option>
          </select>
        </div>

        <textarea
          className="bg-neutral-800 px-3 py-2 rounded-md w-full resize-none h-28"
          placeholder="Descrição da tarefa"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-zinc-700 px-4 py-2 rounded-md hover:bg-zinc-600"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
