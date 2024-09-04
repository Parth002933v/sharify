import express, { Application } from "express";
import healthRouter from "./routes/health-route";
import noteRouter from "./routes/note-routes";
import publishedNoteRouter from "./routes/published-note-routes";
import { globalErrorHandler } from "./middlewares/error-handler-middleware";
import cors from "cors"
import router from "./routes/file-route";
import { handlGetPublishedNote } from "./controllers/public-note-controller";

const app: Application = express()

// middlewares
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(cors())
app.use(express.static("public"))

//routes
app.use("/", publishedNoteRouter)
app.use("/api/", router)
app.use("/api/health", healthRouter)
app.use("/api/note/", noteRouter)


app.use(globalErrorHandler);

export default app
