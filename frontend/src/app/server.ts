import express from "express";
import cors from "cors";
import tasksRouter from "./routes/tasks";
import notesRouter from "./routes/notes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/tasks", tasksRouter); // 🔥 Rota de tarefas
app.use("/notes", notesRouter); // 🔥 Rota de notas

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
