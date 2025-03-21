const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const EmployeeModel = require("./model/Employee");
const agentRoutes = require("./routes/agentroutes");
const csvRoutes = require("./routes/csvRoutes");
const taskRoutes = require("./routes/taskRoute");

const app = express();
app.use(express.json());

// ✅ Fix CORS issues
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // Adjust frontend port if necessary

// ✅ Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/employee", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ API Routes
app.use("/api/agents", agentRoutes);
app.use("/api/csv", csvRoutes);
app.use("/api/tasks", taskRoutes);

// ✅ User Registration
app.post("/register", async (req, res) => {
  try {
    const newEmployee = await EmployeeModel.create(req.body);
    res.status(201).json({ message: "User registered successfully!", user: newEmployee });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ message: "Error registering user", error: err.message });
  }
});

// ✅ User Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await EmployeeModel.findOne({ email });

    if (!user) return res.status(404).json({ message: "No record found" });

    if (user.password === password) {
      res.json({ message: "Success", user });
    } else {
      res.status(401).json({ message: "Incorrect password" });
    }
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
});

// ✅ Default route to check server status
app.get("/", (req, res) => {
  res.send("✅ Server is running...");
});

// ✅ Start Server
const PORT = 3001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
