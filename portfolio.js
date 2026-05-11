const express = require('express');
const router = express.Router();
const { db } = require('../database/init');

// GET /api/portfolio/data - Get all public portfolio data
router.get('/data', async (req, res) => {
  try {
    const [bio, skills, projects, experience, socialLinks, sections] = await Promise.all([
      db.getBio(),
      db.getSkills(),
      db.getProjects(),
      db.getExperience(),
      db.getSocialLinks(),
      db.getSections(),
    ]);

    res.json({ bio, skills, projects, experience, socialLinks, sections });
  } catch (err) {
    console.error('Error fetching portfolio data:', err);
    res.status(500).json({ error: 'Failed to fetch portfolio data' });
  }
});

module.exports = router;