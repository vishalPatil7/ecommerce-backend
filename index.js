import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.js";
import cartRoutes from "./routes/cart.js";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productsApi.js";


connectDB();

const app = express();

app.use(cors());
app.use(bodyParser.json());


app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/products", productRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
