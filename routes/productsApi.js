import express from 'express';
import { Products } from '../models/Products.js';

const router = express.Router();

router.get("/", (req, res) => {
    res.json(Products);
})


router.get("/:id", (req, res) => {
  const product = Products.find((p) => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
});


export default router;
