export type Priority = "NONE" | "LOW" | "MEDIUM" | "HIGH";

export interface Task {
  id?: number;
  title: string;
  isCompleted: boolean;
  priority: Priority;
}
