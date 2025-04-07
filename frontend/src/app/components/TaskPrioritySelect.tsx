import React, { useState } from "react";
import { IoIosFlag } from "react-icons/io";
import { useTasks } from "../hooks/useTask";

export default function TaskPrioritySelect() {
  const { task, setTask } = useTasks(); 
  const [showOptions, setShowOptions] = useState(false);

  const handleSelectOption = (priority: "NONE" | "LOW" | "MEDIUM" | "HIGH") => {
    setTask({ ...task, priority });
    setShowOptions(false);
  };

  return (
    <div className="relative">
      <div
        className="custom-select border border-zinc-800 px-2 py-1 rounded-md cursor-pointer"
        onClick={() => setShowOptions(!showOptions)}
      >
        <IoIosFlag
          className={`text-${
            task.priority === "NONE"
              ? "zinc-500"
              : task.priority === "LOW"
              ? "blue-500"
              : task.priority === "MEDIUM"
              ? "yellow-500"
              : "red-500"
          }`}
        />
      </div>

      {showOptions && (
        <div className="absolute bg-white border border-zinc-800 mt-1 rounded-md w-full z-10 min-w-[120px]">
          <div
            className="option px-3 py-2 cursor-pointer hover:bg-gray-200 flex items-center justify-start w-full"
            onClick={() => handleSelectOption("NONE")}
          >
            <IoIosFlag className="text-zinc-500 mr-1" />
            Nenhuma
          </div>
          <div
            className="option px-3 py-2 cursor-pointer hover:bg-gray-200 flex items-center justify-start w-full"
            onClick={() => handleSelectOption("LOW")}
          >
            <IoIosFlag className="text-blue-500 mr-1" />
            Baixa
          </div>
          <div
            className="option px-3 py-2 cursor-pointer hover:bg-gray-200 flex items-center justify-start w-full"
            onClick={() => handleSelectOption("MEDIUM")}
          >
            <IoIosFlag className="text-yellow-500 mr-1" />
            Média
          </div>
          <div
            className="option px-3 y-2 cursor-pointer hover:bg-gray-200 flex items-center justify-start w-full"
            onClick={() => handleSelectOption("HIGH")}
          >
            <IoIosFlag className="text-red-500 mr-1" />
            Alta
          </div>
        </div>
      )}
    </div>
  );
}
