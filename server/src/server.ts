import express, { type Response } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import env from "../env";
import CustomerQueriesRoutes from "./routes/customerQueryRoutes";
const app = express();

app.use(helmet()); // Security headers
app.use(morgan("dev")); // Request logging

app.use(
  cors({
    origin: [env.CLIENT_URL],
  })
);

app.use(express.json()); //Parse body

app.get("/health", (_, res: Response) => {
  console.log("Server health");
  res.status(200).json({
    message: "OK!",
  });
});

app.use("/api/customer-queries", CustomerQueriesRoutes);

export default app;
export { app };
