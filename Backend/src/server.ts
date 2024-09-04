import express, { Application } from "express";
import healthRouter from "./routes/health-route";
import noteRouter from "./routes/note-routes";
import { globalErrorHandler } from "./middlewares/error-handler-middleware";
import cors from "cors"
import router from "./routes/file-route";

const app: Application = express()

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(cors())
app.use(express.static("public"))



app.use("/api/", router)
app.use("/api/health", healthRouter)
app.use("/api/note/", noteRouter)


app.use(globalErrorHandler);

export default app
