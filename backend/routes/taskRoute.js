const express = require("express");
const Task = require("../model/Task");
const Agent = require("../model/Agent");

const router = express.Router();

// Add a new task
router.post("/add", async (req, res) => {
  try {
    const { firstName, phone, notes } = req.body;
    const newTask = new Task({ firstName, phone, notes, assigned: false }); // New task, not assigned initially
    await newTask.save();
    res.status(201).json({ message: "Task added successfully!", task: newTask });
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ error: "Failed to add task", details: error.message });
  }
});

// Assign unassigned tasks to available agents
router.post("/assign", async (req, res) => {
  try {
    const agents = await Agent.find();
    const tasks = await Task.find({ assigned: false }); // Fetch only unassigned tasks

    if (!agents.length || !tasks.length) {
      return res.status(400).json({ error: "No agents or unassigned tasks available" });
    }

    let index = 0;
    for (const task of tasks) {
      task.assignedAgent = agents[index % agents.length]._id; // Assign agent in round-robin
      task.assigned = true; // ✅ Mark task as assigned
      await task.save(); // Save updated task
      index++;
    }

    res.status(200).json({ message: "Tasks assigned successfully!" });
  } catch (error) {
    console.error("Task Assignment Error:", error);
    res.status(500).json({ error: "Error assigning tasks", details: error.message });
  }
});

// Fetch all tasks with agent details
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().populate("assignedAgent", "name email mobile"); // ✅ Populate agent details
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Error fetching tasks" });
  }
});

module.exports = router;
