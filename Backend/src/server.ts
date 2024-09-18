import express, { Application } from "express";
import healthRouter from "./routes/health-route";
import noteRouter from "./routes/note-routes";
import publishedNoteRouter from "./routes/published-note-routes";
import { globalErrorHandler } from "./middlewares/error-handler-middleware";
import cors from "cors"
import uploadAndDownloadRouter from "./routes/file-route";
import { handlGetPublishedNote } from "./controllers/public-note-controller";

const app: Application = express()

// middlewares
app.use(cors({
    origin: '*',
    credentials: true,
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

//routes
app.use("/", publishedNoteRouter)
app.use("/api/", uploadAndDownloadRouter)
app.use("/api/health", healthRouter)
app.use("/api/note/", noteRouter)


app.use(globalErrorHandler);

export default app
