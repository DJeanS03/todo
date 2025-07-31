// services/taskService.ts
import { Task } from "../types/Task";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getTasks = async (): Promise<Task[]> => {
  const resp = await fetch(`${API_URL}`);
  return await resp.json();
};

export const createTask = async (task: Task): Promise<void> => {
  await fetch(`${API_URL}`, {
    method: "POST",
    body: JSON.stringify(task),
    headers: { "Content-Type": "application/json" },
  });
};

export const updateTask = async (task: Task): Promise<void> => {
  await fetch(`${API_URL}/${task.id}`, {
    method: "PATCH",
    body: JSON.stringify(task),
    headers: { "Content-Type": "application/json" },
  });
};

export const deleteTask = async (id: number): Promise<void> => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};

export const toggleTaskStatus = async (
  id: number,
  isCompleted: boolean
): Promise<void> => {
  await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ isCompleted }),
    headers: { "Content-Type": "application/json" },
  });
};

export const getTaskById = async (id: number): Promise<Task> => {
  const resp = await fetch(`${API_URL}/${id}`);
  return await resp.json();
};
