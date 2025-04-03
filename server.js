import express from "express";
import dotenv from "dotenv";
import connectDB from "./database.js";
import Customer from "./models/customer.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Endpoint to Search Auction listings
app.get("/search", async (req, res) => {
      try {
            const { keyword } = req.query;
            if (!keyword) return res.status(400).json({ message: "Keyword is required" });

            const results = await Customer.find({
                  $or: [{ title: new RegExp(keyword, "i") }, { description: new RegExp(keyword, "i") }],
            });

            res.json(results);
      } catch (error) {
            res.status(500).json({ message: "Server Error", error: error.message });
      }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
