"use client"; 
import { useRef, useState } from "react";
import { useTasks } from "../../hooks/useTask";
import { ExportTasks } from "./ExportTasks";
import TaskPrioritySelect from "./TaskPrioritySelect"; 
import Input from "../ui/Input"; 
import Textarea from "../ui/Textarea"; 

export function RenderizarFormTask() {
  const { task, setTask, criarTask } = useTasks();
  const [showDescription, setShowDescription] = useState(false);
  const descInputRef = useRef<HTMLTextAreaElement>(null);

  const [isFocused, setIsFocused] = useState(false);

  // Manipuladores de foco para os inputs/textareas
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setTimeout(() => {
      if (
        !document.activeElement ||
        (document.activeElement !==
          document.getElementById("task-title-input") &&
          document.activeElement !==
            document.getElementById("task-description-textarea"))
      ) {
        setIsFocused(false);
      }
    }, 50); // Pequeno atraso (ex: 50ms)
  };

  return (
    <div className="flex gap-2 w-full max-w-xl">
      <div
        className={`w-full border rounded-md px-2 py-1 bg-neutral-800 transition-all duration-200 ${
          isFocused ? "border-blue-500" : "border-zinc-800"
        }`}
      >
        <Input
          id="task-title-input"
          variant="base"
          placeholder="Título da tarefa"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          autoFocus
          onFocus={handleFocus} // ✨ Adiciona o manipulador de foco
          onBlur={handleBlur} // ✨ Adiciona o manipulador de blur
          onKeyDown={(e) => {
            if (e.shiftKey && e.key === "Enter") {
              e.preventDefault();
              setShowDescription(true);
              setTimeout(() => descInputRef.current?.focus(), 100);
              return;
            }

            if (e.key === "Enter") {
              criarTask();
              (
                window as Window & {
                  showToast?: (title: string, message: string) => void;
                }
              ).showToast?.("Tarefa criada", "Sua nova tarefa foi adicionada.");

              setTask({
                title: "",
                description: "",
                isCompleted: false,
                priority: "NONE",
              });
              setShowDescription(false);
            }
          }}
        />

        {showDescription && (
          <Textarea
            id="task-description-textarea"
            ref={descInputRef}
            value={task.description || ""}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            placeholder="Descrição da tarefa"
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="focus:outline-none focus:ring-0 focus:ring-neutral-800 h-10"
          />
        )}

        {!task.id && isFocused && (
          <div className="flex justify-end mt-2 gap-2">
            <TaskPrioritySelect
              priority={task.priority}
              onChange={(newPriority) =>
                setTask({ ...task, priority: newPriority })
              }
            />

            <button
              onClick={() => {
                criarTask();
                (
                  window as Window & {
                    showToast?: (title: string, message: string) => void;
                  }
                ).showToast?.(
                  "Tarefa criada",
                  "Sua nova tarefa foi adicionada."
                );
                setTask({
                  title: "",
                  description: "",
                  isCompleted: false,
                  priority: "NONE",
                });
                setShowDescription(false);
              }}
              disabled={!task.title.trim()}
              className={`px-2 py-1 rounded-md text-white transition-colors duration-300${
                task.title.trim()
                  ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                  : "bg-zinc-400 opacity-50 cursor-not-allowed"
              } w-auto`}
            >
              Criar
            </button>
          </div>
        )}
      </div>

      {/* <div>
        <ExportTasks />
      </div> */}
    </div>
  );
}
