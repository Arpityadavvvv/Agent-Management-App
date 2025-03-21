const express = require("express");
const bcrypt = require("bcrypt");
const Agent = require("../model/Agent");
const Task = require("../model/Task");

const router = express.Router();

// ✅ Add Agent with Hashed Password
router.post("/add", async (req, res) => {
  const { name, email, mobile, password } = req.body;

  try {
    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingAgent = await Agent.findOne({ email });
    if (existingAgent) {
      return res.status(400).json({ message: "Agent with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAgent = new Agent({ name, email, mobile, password: hashedPassword });
    await newAgent.save();

    res.status(201).json({ message: "Agent added successfully!" });
  } catch (error) {
    console.error("Error adding agent:", error);
    res.status(500).json({ message: "Error adding agent", error: error.message });
  }
});

// ✅ Get Agents with Assigned Tasks
router.get("/with-tasks", async (req, res) => {
  try {
    const agents = await Agent.find().select("-password -__v").lean();
    if (!agents.length) {
      return res.status(404).json({ message: "No agents found" });
    }

    const tasks = await Task.find().select("-__v").lean();

    const agentsWithTasks = agents.map((agent) => {
      const assignedTasks = tasks
        .filter((task) => task.assignedAgent?.toString() === agent._id.toString())
        .map(({ _id, firstName, phone, notes, assigned }) => ({
          _id,
          firstName,
          phone,
          notes,
          assigned,
          assignedAgent: {
            _id: agent._id,
            name: agent.name,
            email: agent.email,
          },
        }));

      return { ...agent, tasks: assignedTasks };
    });

    res.json(agentsWithTasks);
  } catch (error) {
    console.error("Error fetching agents with tasks:", error);
    res.status(500).json({ error: "Error fetching agents with tasks", details: error.message });
  }
});

module.exports = router;
