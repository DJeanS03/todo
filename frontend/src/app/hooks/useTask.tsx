/* // TasksContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Task } from "../types/Task";

interface TasksContextType {
  tasks: Task[];
  task: Task;
  setTask: React.Dispatch<React.SetStateAction<Task>>;
  criarTask: () => Promise<void>;
  editarTask: () => Promise<void>;
  deletarTask: (id: number) => Promise<void>;
  alterarTaskStatus: (id: number, isCompleted: boolean) => Promise<void>;
  obterTaskPorId: (id: number) => Promise<void>;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<Task>({ title: "", isCompleted: false });

  const API_URL = "http://localhost:3001/tasks";

  const obterTasks = async (): Promise<void> => {
    const resp = await fetch(API_URL);
    const tasks = await resp.json();
    setTasks(tasks);
  };

  useEffect(() => {
    obterTasks();
  }, []);

  const criarTask = async () => {
    await fetch(`${API_URL}`, {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setTask({ title: "", isCompleted: false });
    await obterTasks();
  };

  const editarTask = async () => {
    await fetch(`${API_URL}/${task.id}`, {
      method: "PATCH",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setTask({ title: "", isCompleted: false });
    await obterTasks();
  };

  const deletarTask = async (id: number) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    await obterTasks();
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
  };

  const obterTaskPorId = async (id: number) => {
    const resp = await fetch(`${API_URL}/${id}`);
    const task = await resp.json();
    setTask(task);
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        task,
        setTask,
        criarTask,
        editarTask,
        deletarTask,
        alterarTaskStatus,
        obterTaskPorId,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks precisa estar dentro de <TasksProvider>");
  }
  return context;
};
 */
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { Task } from "../types/Task";

interface TaskContextType {
  tasks: Task[];
  task: Task;
  setTask: React.Dispatch<React.SetStateAction<Task>>;
  criarTask: () => Promise<void>;
  editarTask: () => Promise<void>;
  deletarTask: (id: number) => Promise<void>;
  alterarTaskStatus: (id: number, isCompleted: boolean) => Promise<void>;
  obterTaskPorId: (id: number) => Promise<void>;
}

const TaskContext = createContext({} as TaskContextType);

const API_URL = "http://localhost:3001/tasks";

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<Task>({ title: "", isCompleted: false });

  useEffect(() => {
    obterTasks();
  }, []);

  const obterTasks = async () => {
    const resp = await fetch(API_URL);
    const tasks = await resp.json();
    tasks.sort((a: Task, b: Task) => Number(a.isCompleted) - Number(b.isCompleted));
    setTasks(tasks);
  };

  const criarTask = async () => {
    await fetch(`${API_URL}`, {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setTask({ title: "", isCompleted: false });
    await obterTasks();
  };

  const editarTask = async () => {
    await fetch(`${API_URL}/${task.id}`, {
      method: "PATCH",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setTask({ title: "", isCompleted: false });
    await obterTasks();
  };

  const deletarTask = async (id: number) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    await obterTasks();
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
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => useContext(TaskContext);

