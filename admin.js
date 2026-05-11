const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { db } = require('../database/init');
const { authenticateToken } = require('../middleware/auth');

// Multer config for memory storage (for Supabase upload)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  },
});

// POST /api/admin/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@mehrab.dev';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (email === adminEmail && password === adminPassword) {
    const token = jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: { email, role: 'admin' } });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// GET /api/admin/verify
router.get('/verify', authenticateToken, (req, res) => {
  res.json({ valid: true, user: req.user });
});

// --- Bio ---
router.get('/bio', authenticateToken, async (req, res) => {
  try {
    const bio = await db.getBio();
    res.json(bio);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/bio', authenticateToken, async (req, res) => {
  try {
    const updated = await db.updateBio(req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Skills ---
router.get('/skills', authenticateToken, async (req, res) => {
  try {
    const skills = await db.getAllSkills();
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/skills', authenticateToken, async (req, res) => {
  try {
    const skill = await db.createSkill(req.body);
    res.status(201).json(skill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/skills/:id', authenticateToken, async (req, res) => {
  try {
    const skill = await db.updateSkill(parseInt(req.params.id), req.body);
    res.json(skill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/skills/:id', authenticateToken, async (req, res) => {
  try {
    await db.deleteSkill(parseInt(req.params.id));
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Projects ---
router.get('/projects', authenticateToken, async (req, res) => {
  try {
    const projects = await db.getAllProjects();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/projects', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    let image_url = '';
    if (req.file) {
      const fileName = `${Date.now()}-${req.file.originalname}`;
      image_url = await db.uploadImage(req.file, fileName);
    }
    const projectData = { ...req.body, image_url: image_url || req.body.image_url || '' };
    const project = await db.createProject(projectData);
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/projects/:id', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    let image_url = req.body.image_url;
    if (req.file) {
      const fileName = `${Date.now()}-${req.file.originalname}`;
      image_url = await db.uploadImage(req.file, fileName);
    }
    const updates = { ...req.body };
    if (image_url !== undefined) updates.image_url = image_url;
    const project = await db.updateProject(parseInt(req.params.id), updates);
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/projects/:id', authenticateToken, async (req, res) => {
  try {
    await db.deleteProject(parseInt(req.params.id));
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Experience ---
router.get('/experience', authenticateToken, async (req, res) => {
  try {
    const experience = await db.getAllExperience();
    res.json(experience);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/experience', authenticateToken, async (req, res) => {
  try {
    const exp = await db.createExperience(req.body);
    res.status(201).json(exp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/experience/:id', authenticateToken, async (req, res) => {
  try {
    const exp = await db.updateExperience(parseInt(req.params.id), req.body);
    res.json(exp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/experience/:id', authenticateToken, async (req, res) => {
  try {
    await db.deleteExperience(parseInt(req.params.id));
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Sections ---
router.get('/sections', authenticateToken, async (req, res) => {
  try {
    const sections = await db.getSections();
    res.json(sections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/sections/:id', authenticateToken, async (req, res) => {
  try {
    const section = await db.updateSection(parseInt(req.params.id), req.body);
    res.json(section);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Messages ---
router.get('/messages', authenticateToken, async (req, res) => {
  try {
    const messages = await db.getMessages();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/messages/:id/read', authenticateToken, async (req, res) => {
  try {
    await db.markMessageRead(parseInt(req.params.id));
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/messages/:id', authenticateToken, async (req, res) => {
  try {
    await db.deleteMessage(parseInt(req.params.id));
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Image Upload (standalone) ---
router.post('/upload', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }
    const fileName = `${Date.now()}-${req.file.originalname}`;
    const url = await db.uploadImage(req.file, fileName);
    res.json({ url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;