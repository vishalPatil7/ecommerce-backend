import express from "express";
import Cart from "../models/Cart.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

// Add item to cart
router.post("/add", verifyToken, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    const productIndex = cart.products.findIndex((p) => p.productId.equals(productId));

    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart" });
  }
});

// Get user-specific cart items
router.get("/", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id; // Ensure user ID is properly retrieved
    const cart = await Cart.findOne({ userId }).populate("products.productId");

    if (!cart) {
      return res.status(200).json({ products: [] }); // Return an empty cart for new users
    }

    res.json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Error fetching cart" });
  }
});


export default router;
