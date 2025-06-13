"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Task } from "../types/Task";
import toast from "react-hot-toast";

export interface TaskContextType {
  tasks: Task[];
  task: Task;
  setTask: React.Dispatch<React.SetStateAction<Task>>;
  criarTask: () => Promise<void>;
  editarTask: (taskParaEditar: Task) => Promise<void>;
  deletarTask: (id: number) => Promise<void>;
  alterarTaskStatus: (id: number, isCompleted: boolean) => Promise<void>;
  obterTaskPorId: (id: number) => Promise<void>;

  sortType: "ALPHABETICAL" | "PRIORITY";
  setSortType: React.Dispatch<
    React.SetStateAction<"ALPHABETICAL" | "PRIORITY">
  >;
}

const TaskContext = createContext({} as TaskContextType);

const API_URL = "http://localhost:3001/tasks";

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<Task>({
    title: "",
    description: "",
    isCompleted: false,
    priority: "NONE",
  });
  const [sortType, setSortType] = useState<"ALPHABETICAL" | "PRIORITY">(
    "PRIORITY"
  );

  const obterTasks = useCallback(async () => {
    const resp = await fetch(API_URL);
    const tasks = await resp.json();

    const prioridadeNumerica = { NONE: 0, LOW: 1, MEDIUM: 2, HIGH: 3 };

    tasks.sort((a: Task, b: Task) => {
      if (a.isCompleted !== b.isCompleted) {
        return a.isCompleted ? 1 : -1;
      }

      if (sortType === "ALPHABETICAL") {
        return a.title.localeCompare(b.title);
      } else {
        return prioridadeNumerica[b.priority] - prioridadeNumerica[a.priority];
      }
    });

    setTasks(tasks);
  }, [sortType]);

  useEffect(() => {
    obterTasks();
  }, [obterTasks]);

  const criarTask = async () => {
    if (!task.title.trim()) {
      toast.error("O título da tarefa não pode estar vazio.");
      return;
    }
    await fetch(`${API_URL}`, {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setTask({ title: "", description: "", isCompleted: false, priority: "NONE" });
    await obterTasks();

    toast("Nova tarefa criada!", {
      icon: "✅",
    });
  };

  const editarTask = async (taskParaEditar: Task) => {
    const trimmedTitle = taskParaEditar.title.trim();

    if (!trimmedTitle) {
      toast.error("O título da tarefa não pode estar vazio.");
      return;
    }

    await fetch(`${API_URL}/${taskParaEditar.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        ...taskParaEditar,
        title: trimmedTitle,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setTask({ title: "", description: "", isCompleted: false, priority: "NONE" });
    await obterTasks();
    toast.success("Tarefa atualizada com sucesso!");
  };

  const deletarTask = async (id: number) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    await obterTasks();
    toast.success("Tarefa deletada com sucesso!", {
      icon: "🗑️" ,});
  };

  const alterarTaskStatus = async (id: number, isCompleted: boolean) => {
    await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ isCompleted }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    await obterTasks();
    toast.success(
      `Tarefa ${isCompleted ? "concluída" : "reativada"} com sucesso!`,
      {
        icon: isCompleted ? "✅" : "🔄",
      }
    );
  };

  const obterTaskPorId = async (id: number) => {
    const resp = await fetch(`${API_URL}/${id}`);
    const task = await resp.json();
    setTask(task);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        task,
        setTask,
        criarTask,
        editarTask,
        deletarTask,
        alterarTaskStatus,
        obterTaskPorId,
        sortType,
        setSortType,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => useContext(TaskContext);
