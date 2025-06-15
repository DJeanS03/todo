import { useTasks } from "../../hooks/useTask";
import { Task } from "../../types/Task";

export function ExportTasks() {
  const { tasks } = useTasks();

  const exportTasksToCSV = (tasks: Task[]) => {
    const headers = ["ID", "Título", "Concluída", "Prioridade"];
    const rows = tasks.map((task) => [
      task.id,
      task.title,
      task.isCompleted ? "Sim" : "Não",
      task.priority,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row.map((field) => `"${String(field).replace(/"/g, '""')}"`).join(";")
      )
      .join("\r\n");

    const BOM = "\uFEFF";
    const blob = new Blob([BOM + csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "tarefas.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <button
        onClick={() => exportTasksToCSV(tasks)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Exportar CSV
      </button>
    </div>
  );
}
