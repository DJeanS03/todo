import express from "express";
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const tasks = await getTasks(); // chama a função de serviço
    res.json(tasks); // envia a resposta
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar tarefas" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const task = await getTaskById(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar tarefa" });
  }
});

router.post("/", createTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;

/* import express from "express";
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskStatus
} from "../services/taskService";

const router = express.Router();

// GET / - lista todas as tarefas
router.get("/", async (req, res) => {
  try {
    const tasks = await getTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar tarefas" });
  }
});

// GET /:id - pega tarefa por ID
router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

    const task = await getTaskById(id);
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar tarefa" });
  }
});

// POST / - cria uma nova tarefa
router.post("/", async (req, res) => {
  try {
    const task = req.body;
    await createTask(task);
    res.status(201).json({ message: "Tarefa criada com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar tarefa" });
  }
});

// PATCH /:id - atualiza uma tarefa existente
router.patch("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

    const task = { ...req.body, id };
    await updateTask(task);
    res.json({ message: "Tarefa atualizada com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar tarefa" });
  }
});

// DELETE /:id - deleta uma tarefa
router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

    await deleteTask(id);
    res.json({ message: "Tarefa removida com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar tarefa" });
  }
});

// PATCH /:id/toggle - alterna status da tarefa (opcional)
router.patch("/:id/toggle", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { isCompleted } = req.body;
    if (isNaN(id) || typeof isCompleted !== "boolean") {
      return res.status(400).json({ error: "Dados inválidos" });
    }

    await toggleTaskStatus(id, isCompleted);
    res.json({ message: "Status da tarefa atualizado" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao alterar status da tarefa" });
  }
});

export default router;
 */
