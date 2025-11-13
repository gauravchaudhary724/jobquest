const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Job = require("../models/Job");

// Add Job
router.post("/", auth, async (req, res) => {
  try {
    const job = new Job({
      user: req.user,
      jobTitle: req.body.jobTitle,
      company: req.body.company,
      jobLink: req.body.jobLink,
      notes: req.body.notes
    });

    await job.save();
    res.json(job);

  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Get All Jobs of User
router.get("/", auth, async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Update Job Status
router.put("/:id", auth, async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Delete Job
router.delete("/:id", auth, async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ msg: "Job deleted" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
