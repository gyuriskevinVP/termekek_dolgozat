import express from "express";
import { dbAll, dbGet, dbRun } from "../data/database.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const rows = await dbAll("SELECT * FROM products");
    res.status(200).json(rows);
  } catch (err) {
    console.log(`Error: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
});

router.post("/", (req, res) => {
  const { brand, model, color, year } = req.body;
  if (!brand && !model && !color && !year) {
    return res.status(400).json({ message: "Missing data!" });
  }
  try {
    const car = dbRun(
      "INSERT INTO products (name, brand, description, price) VALUES (?, ?, ?, ?)",
      [brand, model, color, year]
    );
    res.status(201).json({ message: "Created succsefully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const car = await dbGet("Select * FROM products WHERE id = ?", [
      req.params.id,
    ]);
    if (!car) {
      return res.status(404).json({ message: "Data not found!" });
    }
    res.status(200).json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  const { brand, model, color, year } = req.body;
  if (!brand && !model && !color && !year) {
    return res.status(400).json({ message: "Missing data!" });
  }
  try {
    const car = await dbGet("Select * FROM productsWHERE id = ?", [
      req.params.id,
    ]);
    if (!car) {
      return res.status(404).json({ message: "Product not found!" });
    }
    await dbRun([brand, model, color, year, car.id]);

    res.status(200).json({ message: "Updated successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const car = await dbGet("", [req.params.id]);
    if (!car) {
      return res.status(404).json({ message: "Product not found!" });
    }
    await dbRun("DELETE FROM products WHERE id = ?", [req.params.id]);
    res.status(200).json({ message: "Delete successfull." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
