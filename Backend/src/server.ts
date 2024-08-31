import express, { Application } from "express";
import healthRouter from "./routes/health-route";
import noteRouter from "./routes/note-routes";
import { globalErrorHandler } from "./middlewares/error-handler-middleware";
import cors from "cors"

const app: Application = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())


app.use("/api/health", healthRouter)
app.use("/api/note/", noteRouter)


app.use(globalErrorHandler);

export default app
