const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Task = require("../models/Task");

// CREATE TASK
router.post("/", auth, async (req, res) => {
  try {
    const task = new Task({
      user: req.user,
      title: req.body.title,
      description: req.body.description
    });
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

// GET ALL TASKS
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

// MARK TASK COMPLETED
router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { completed: true },
      { new: true }
    );
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

// DELETE TASK
router.delete("/:id", auth, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: "Task deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
