
import express from "express";
import Order from "../models/Order.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ PLACE ORDER
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { items, totalPrice } = req.body;

    const order = new Order({
      userId: req.userId,
      items,
      totalPrice,
    });

    await order.save();

    res.json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error("Order error:", error);
    res.status(500).json({ message: "Order failed" });
  }
});

// ✅ GET USER ORDERS
router.get("/", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId });
    res.json(orders);
  } catch (error) {
    console.error("Fetch orders error:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

// ✅ CANCEL ORDER
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.userId.toString() !== req.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await order.deleteOne();

    res.json({ message: "Order canceled successfully" });
  } catch (error) {
    console.error("Cancel order error:", error);
    res.status(500).json({ message: "Cancel failed" });
  }
});

export default router;
