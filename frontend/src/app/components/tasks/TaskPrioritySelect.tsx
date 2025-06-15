import React, { useState } from "react";
import { IoIosFlag } from "react-icons/io";

type Priority = "NONE" | "LOW" | "MEDIUM" | "HIGH";

interface TaskPrioritySelectProps {
  priority: Priority;
  onChange: (priority: Priority) => void;
  // ✨ Nova prop para controlar o tamanho
  size?: "sm" | "md" | "lg" | "xl"; 
}

export default function TaskPrioritySelect({
  priority,
  onChange,
  size = "md",
}: TaskPrioritySelectProps) {
  const [showOptions, setShowOptions] = useState(false);

  const handleSelectOption = (newPriority: Priority) => {
    onChange(newPriority);
    setShowOptions(false);
  };

  const iconSizeClass = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-xl",
    xl: "text-2xl",
  }[size];

  const paddingClass = {
    sm: "px-1.5 py-0.5",
    md: "px-2 py-1",
    lg: "px-3 py-1.5",
    xl: "px-4 py-2",
  }[size];

  const fontSizeClass = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  }[size];

  return (
    <div className="relative">
      <div
        className={`custom-select cursor-pointer flex items-center justify-center ${paddingClass} hover:bg-gray-200 rounded-md transition-colors duration-200 ${fontSizeClass}`}
        onClick={() => setShowOptions(!showOptions)}
        title="Prioridade da tarefa"
      >
        <IoIosFlag
          className={`${iconSizeClass} ${
            priority === "NONE"
              ? "text-zinc-500"
              : priority === "LOW"
              ? "text-blue-500"
              : priority === "MEDIUM"
              ? "text-yellow-500"
              : "text-red-500"
          }`}
        />
      </div>

      {showOptions && (
        <div
          className={`absolute bg-white border border-zinc-800 mt-1 rounded-md w-full z-10 min-w-[120px] ${fontSizeClass}`}
        >
          <div
            className="option px-3 py-2 cursor-pointer hover:bg-gray-200 flex items-center justify-start w-full"
            onClick={() => handleSelectOption("NONE")}
          >
            <IoIosFlag className={`${iconSizeClass} text-zinc-500 mr-1`} />
            Nenhuma
          </div>
          <div
            className="option px-3 py-2 cursor-pointer hover:bg-gray-200 flex items-center justify-start w-full"
            onClick={() => handleSelectOption("LOW")}
          >
            <IoIosFlag className={`${iconSizeClass} text-blue-500 mr-1`} />
            Baixa
          </div>
          <div
            className="option px-3 py-2 cursor-pointer hover:bg-gray-200 flex items-center justify-start w-full"
            onClick={() => handleSelectOption("MEDIUM")}
          >
            <IoIosFlag className={`${iconSizeClass} text-yellow-500 mr-1`} />
            Média
          </div>
          <div
            className="option px-3 py-2 cursor-pointer hover:bg-gray-200 flex items-center justify-start w-full"
            onClick={() => handleSelectOption("HIGH")}
          >
            <IoIosFlag className={`${iconSizeClass} text-red-500 mr-1`} />
            Alta
          </div>
        </div>
      )}
    </div>
  );
}
