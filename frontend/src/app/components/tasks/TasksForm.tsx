"use client";
import { useRef, useState } from "react";
import { useTasks } from "../../hooks/useTask";
import TaskPrioritySelect from "./TaskPrioritySelect";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
//import { ExportTasks } from "./ExportTasks";

export function RenderizarFormTask() {
  const { task, setTask, criarTask } = useTasks();
  const [showDescription, setShowDescription] = useState(false);
  const descInputRef = useRef<HTMLTextAreaElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);
  const inputTitleRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);

  const handleBlur = () => {
    setTimeout(() => {
      if (
        formContainerRef.current &&
        !formContainerRef.current.contains(document.activeElement)
      ) {
        setIsFocused(false);
      }
    }, 0);
  };

  const handleContainerFocus = () => {
    setIsFocused(true);
  };

  const resetFormAndBlur = () => {
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

    setIsFocused(false);

    if (inputTitleRef.current) {
      inputTitleRef.current.blur();
    }
  };

  return (
    <div className="flex gap-2 w-full max-w-xl">
      <div
        ref={formContainerRef}
        onFocus={handleContainerFocus}
        onBlur={handleBlur}
        className={`w-full rounded-md px-2 py-1 bg-neutral-800 transition-all duration-200 ${isFocused ? "border border-blue-500" : "border border-transparent"
          }`}
        tabIndex={-1}
      >
        <Input
          id="task-title-input"
          ref={inputTitleRef}
          variant="base"
          placeholder="O que você precisa fazer?"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          onKeyDown={(e) => {
            if (e.shiftKey && e.key === "Enter") {
              e.preventDefault();
              setShowDescription(true);
              setTimeout(() => descInputRef.current?.focus(), 100);
              return;
            }

            if (e.key === "Enter") {
              resetFormAndBlur();
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
            className="focus:outline-none focus:ring-0 focus:ring-neutral-800 h-10"
          />
        )}

        {!task.id && isFocused && (
          <div className="flex justify-between mt-2 pl-3 gap-2">
            <div className="text-xs text-zinc-500 min-h-[1rem]">
              {!showDescription ? "Pressione Shift+Enter para descrição" : null}
            </div>
            <div className="flex">
              <TaskPrioritySelect
                priority={task.priority}
                onChange={(newPriority) =>
                  setTask({ ...task, priority: newPriority })
                }
                size="md"
              />
              <button
                onClick={resetFormAndBlur}
                disabled={!task.title.trim()}
                className={`px-2 py-1 rounded-md text-white transition-colors duration-300 text-sm ${task.title.trim()
                  ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                  : "bg-zinc-400 opacity-50 cursor-not-allowed"
                  } w-auto`}
              >
                Adicionar
              </button>
            </div>
          </div>
        )}

      </div>

      {/* <div>
        <ExportTasks />
      </div> */}
    </div>
  );
}
