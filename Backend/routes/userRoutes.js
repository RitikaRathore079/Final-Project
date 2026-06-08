import express from "express";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// ✅ GET ALL USERS (Admin Only)
router.get("/", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const users = await User.find({}, "-password"); // Exclude password
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch users" });
    }
});

export default router;
