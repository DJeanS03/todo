"use client";

import { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuPencil } from "react-icons/lu";

interface Task {
  id?: number;
  title: string;
  isCompleted: boolean;
}

export default function Home() {
  const [task, setTask] = useState<Task>({
    title: "",
    isCompleted: false,
  });
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    obterTasks();
  }, []);

  async function obterTasks() {
    const resp = await fetch("http://localhost:3001/tasks");
    const tasks = await resp.json();
    setTasks(tasks);
  }

  async function criarTask() {
    await fetch("http://localhost:3001/tasks", {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setTask({
      title: "",
      isCompleted: false,
    });
    await obterTasks();
  }

  async function deletarTask(id: number) {
    await fetch(`http://localhost:3001/tasks/${id}`, {
      method: "DELETE",
    });
    await obterTasks();
  }

  async function alterarTaskStatus(id: number, isCompleted: boolean) {
    try {
      const response = await fetch(`http://localhost:3001/tasks/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ isCompleted }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        await obterTasks();
      } else {
        console.error("Erro ao alterar o status da tarefa");
      }
    } catch (error) {
      console.error("Erro ao alterar o status da tarefa:", error);
    }
  }

  /*   async function obterTaskPorId(id: number) {
    const resp = await fetch(`http://localhost:3001/tasks/${id}`);
    const task = await resp.json();
    setTask(task);
  } */

  function renderizarTasks() {
    if (tasks.length === 0) {
      return <p>Não há tarefas</p>;
    }

    return (
      <div className="flex flex-col gap-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center gap-4 bg-zinc-800 px-4 py-2 rounded-md justify-between"
          >
            {/*    <input
              type="checkbox"
              checked={task.isCompleted}
              onChange={() =>
                task.id && alterarTaskStatus(task.id, !task.isCompleted)
              }
            /> */}

            <label
              htmlFor="hr"
              className="flex flex-row items-center gap-2.5 dark:text-white light:text-black"
            >
              <input
                id="hr"
                type="checkbox"
                className="peer hidden"
                checked={task.isCompleted}
                onChange={() =>
                  task.id && alterarTaskStatus(task.id, !task.isCompleted)
                }
              />
              <div className="h-5 w-5 flex rounded-md border border-[#a2a1a833] light:bg-[#e8e8e8] dark:bg-[#212121] peer-checked:bg-[#7152f3] transition">
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 light:stroke-[#e8e8e8] dark:stroke-[#212121]"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12.6111L8.92308 17.5L20 6.5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
            </label>

            <span>{task.title}</span>
            <div className="flex gap-2 items-center">
              <LuPencil />

              <FaRegTrashAlt
                className="hover:text-red-500 transition duration-300"
                onClick={() => task.id && deletarTask(task.id)}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  function renderizarFormTask() {
    return (
      <div className="flex gap-2">
        <input
          type="text"
          value={task.title}
          onChange={(e) =>
            setTask({
              ...task,
              title: e.target.value,
              isCompleted: false,
            })
          }
          placeholder="Tarefa"
          className="border border-zinc-800 px-2 py-1 rounded-md"
        />
        <button
          onClick={criarTask}
          className="bg-zinc-800 px-2 py-1 rounded-md text-white"
        >
          Criar
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen gap-10">
        {renderizarFormTask()}
        <div className="flex gap-2 items-center">
          <p>Concluidas</p>
          <p className="bg-zinc-800 px-2 py-1 rounded-md text-white">
            {tasks.filter((task) => task.isCompleted).length} de {tasks.length}
          </p>
        </div>
        {renderizarTasks()}
      </div>
    </>
  );
}
