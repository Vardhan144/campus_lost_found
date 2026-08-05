const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Item = require("../models/Item");
const { protect } = require("../middleware/auth");

// ---------- Multer setup for image uploads ----------
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "..", "uploads")),
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    const ok = allowed.test(path.extname(file.originalname).toLowerCase());
    cb(ok ? null : new Error("Only image files are allowed"), ok);
  },
});

// @route   GET /api/items
// @desc    List items with optional filters: status, category, search, page, limit
router.get("/", async (req, res) => {
  try {
    const { status, category, search, page = 1, limit = 12 } = req.query;
    const query = {};

    if (status) query.status = status;
    if (category) query.category = category;
    if (search) query.$text = { $search: search };

    const items = await Item.find(query)
      .populate("reportedBy", "name email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Item.countDocuments(query);

    res.json({ items, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET /api/items/:id
router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate("reportedBy", "name email");
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json({ item });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/items
// @desc    Create a new lost/found item report
router.post("/", protect, upload.single("image"), async (req, res) => {
  try {
    const { title, description, category, status, location, date, contactInfo } = req.body;

    const item = await Item.create({
      title,
      description,
      category,
      status,
      location,
      date,
      contactInfo,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : undefined,
      reportedBy: req.user._id,
    });

    res.status(201).json({ item });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   PUT /api/items/:id
// @desc    Update an item (owner or admin only)
router.put("/:id", protect, upload.single("image"), async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    const isOwner = item.reportedBy.toString() === req.user._id.toString();
    if (!isOwner && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to edit this item" });
    }

    const updatable = ["title", "description", "category", "status", "location", "date", "contactInfo"];
    updatable.forEach((field) => {
      if (req.body[field] !== undefined) item[field] = req.body[field];
    });
    if (req.file) item.imageUrl = `/uploads/${req.file.filename}`;

    await item.save();
    res.json({ item });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   PATCH /api/items/:id/claim
// @desc    Mark an item as claimed by the current user
router.patch("/:id/claim", protect, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.status = "claimed";
    item.claimedBy = req.user._id;
    await item.save();

    res.json({ item });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   DELETE /api/items/:id
router.delete("/:id", protect, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    const isOwner = item.reportedBy.toString() === req.user._id.toString();
    if (!isOwner && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to delete this item" });
    }

    await item.deleteOne();
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
