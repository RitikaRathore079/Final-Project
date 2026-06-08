import Order from "../models/Order.js";

// ✅ NAMED EXPORT
export const placeOrder = async (req, res) => {
  try {
    const order = new Order({
      userId: req.userId,
      items: req.body.items,
      totalPrice: req.body.totalPrice,
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Order failed" });
  }
};

// ✅ NAMED EXPORT
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};
