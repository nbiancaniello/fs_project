"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("@shared/models");
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Basic API check
app.get("/api/admin/health", (req, res) => {
    res.json({ status: "ok", message: "Admin backend is running" });
});
// GET /api/admin/products - List all products
app.get("/api/admin/products", async (req, res) => {
    try {
        const products = await models_1.Product.find({});
        res.json(products);
    }
    catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Failed to fetch products" });
    }
});
// GET /api/admin/orders - List all orders
app.get("/api/admin/orders", async (req, res) => {
    try {
        const orders = await models_1.Order.find({});
        res.json(orders);
    }
    catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: "Failed to fetch orders" });
    }
});
// GET /api/admin/users - List all users
app.get("/api/admin/users", async (req, res) => {
    try {
        const users = await models_1.User.find({}, { password: 0 }); // Exclude passwords
        res.json(users);
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});
// GET /api/admin/categories - List all categories
app.get("/api/admin/categories", async (req, res) => {
    try {
        const categories = await models_1.Category.find({});
        res.json(categories);
    }
    catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ error: "Failed to fetch categories" });
    }
});
const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI || "";
if (!MONGODB_URI) {
    console.error("Error: MONGODB_URI environment variable is missing.");
    process.exit(1);
}
mongoose_1.default
    .connect(MONGODB_URI)
    .then(() => {
    console.log("Admin connection to MongoDB successful");
    app.listen(PORT, () => {
        console.log(`Admin backend server running at http://localhost:${PORT}`);
    });
})
    .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
});
