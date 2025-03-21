const express = require("express");
const multer = require("multer");
const xlsx = require("xlsx");
const fs = require("fs-extra");
const path = require("path");
const Agent = require("../model/Agent");
const Task = require("../model/Task");
const router = express.Router();

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/";
    fs.ensureDirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// File Upload Middleware
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["text/csv", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only CSV, XLSX, and XLS files are allowed"));
    }
  },
});

// Upload and Distribute Tasks
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    // Read file
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    if (!data.length) return res.status(400).json({ message: "Empty file" });

    // Required Fields Validation
    const requiredFields = ["FirstName", "Phone", "Notes"];
    if (!requiredFields.every(field => Object.keys(data[0]).includes(field))) {
      return res.status(400).json({ message: "Invalid CSV format" });
    }

    // Fetch 5 agents from DB
    const agents = await Agent.find().limit(5);
    if (agents.length < 5) return res.status(400).json({ message: "At least 5 agents required" });

    let agentIndex = 0;

    // Distribute tasks among agents
    for (let record of data) {
      const task = new Task({
        firstName: record.FirstName,
        phone: record.Phone,
        notes: record.Notes,
        assignedAgent: agents[agentIndex]._id,
      });

      await task.save();
      agentIndex = (agentIndex + 1) % 5;
    }

    res.status(200).json({ message: "Tasks assigned successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Assigned Tasks Per Agent
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find().populate("assignedAgent", "name");
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
