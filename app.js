import express from "express";
import carsRoutes from "./routes/product.js";
import { initialize } from "./data/database.js";
import cors from "cors";

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", carsRoutes);

try {
  await initialize();
  app.listen(PORT, () => {
    console.log(`Server started on localhost:${PORT}`);
  });
} catch (err) {
  console.log(err.message);
}
