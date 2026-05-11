const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let supabase = null;

function getSupabase() {
  if (!supabase) {
    if (!supabaseUrl || !supabaseServiceKey || supabaseUrl === 'your_supabase_project_url') {
      console.warn('⚠️  Supabase not configured. Using in-memory fallback.');
      return null;
    }
    supabase = createClient(supabaseUrl, supabaseServiceKey);
  }
  return supabase;
}

// In-memory fallback database for development without Supabase
const memoryDb = {
  bio: {
    id: 1,
    name: 'Mehrab Morshed Marjan',
    title: 'CSE Student & Tech Enthusiast',
    subtitle: 'Software & Robotics Enthusiast',
    description: 'An Undergraduate CSE Student at East West University, Volunteer and General Member of East West University Robotics Club, Senior General Member of East West Telecommunications Club, and General Member of East West University Computer Programming Club.',
    about_text: 'I am a passionate technology enthusiast with a strong interest in robotics, software engineering, and creative problem-solving. Currently pursuing my B.Sc. in Computer Science and Engineering at East West University, I enjoy exploring innovative ideas and continuously expanding my technical skills.',
    about_text_2: 'As a General Member of East West University Robotics Club and a Senior General Member of East West Telecommunications Club, I actively participate in technical activities, collaborative projects, and learning opportunities that encourage innovation and real-world impact. I am always eager to learn, build, and connect with like-minded individuals in the tech community.',
    email: 'maarjaanmorshed@gmail.com',
    location: 'Dhaka, Bangladesh',
    avatar_url: '/assets/mehrab.png',
    visible: true,
  },
  skills: [
    { id: 1, name: 'C', category: 'technical', icon: 'fa-solid fa-copyright', color: '#6b7280', sort_order: 0, visible: true },
    { id: 2, name: 'C++', category: 'technical', icon: 'fa-solid fa-code', color: '#2563eb', sort_order: 1, visible: true },
    { id: 3, name: 'Java', category: 'technical', icon: 'fa-brands fa-java', color: '#ea580c', sort_order: 2, visible: true },
    { id: 4, name: 'Python', category: 'technical', icon: 'fa-brands fa-python', color: '#eab308', sort_order: 3, visible: true },
    { id: 5, name: 'JavaScript', category: 'technical', icon: 'fa-brands fa-js', color: '#facc15', sort_order: 4, visible: true },
    { id: 6, name: 'HTML/CSS', category: 'technical', icon: 'fa-brands fa-html5', color: '#ea580c', sort_order: 5, visible: true },
    { id: 7, name: 'Tailwind CSS', category: 'technical', icon: 'fa-brands fa-css3-alt', color: '#14b8a6', sort_order: 6, visible: true },
    { id: 8, name: 'React', category: 'technical', icon: 'fa-brands fa-react', color: '#38bdf8', sort_order: 7, visible: true },
    { id: 9, name: 'Node.js', category: 'technical', icon: 'fa-brands fa-node-js', color: '#22c55e', sort_order: 8, visible: true },
    { id: 10, name: 'Git & GitHub', category: 'tools', icon: 'fa-brands fa-github', color: '#1f2937', sort_order: 0, visible: true },
    { id: 11, name: 'Linux', category: 'tools', icon: 'fa-brands fa-linux', color: '#1f2937', sort_order: 1, visible: true },
    { id: 12, name: 'VS Code', category: 'tools', icon: 'fa-solid fa-code', color: '#2563eb', sort_order: 2, visible: true },
    { id: 13, name: 'Arduino', category: 'tools', icon: 'fa-solid fa-microchip', color: '#14b8a6', sort_order: 3, visible: true },
    { id: 14, name: 'Figma', category: 'tools', icon: 'fa-brands fa-figma', color: '#a855f7', sort_order: 4, visible: true },
    { id: 15, name: 'Firebase', category: 'tools', icon: 'fa-solid fa-database', color: '#f59e0b', sort_order: 5, visible: true },
  ],
  projects: [
    { id: 1, title: 'Portfolio Website', description: 'A modern, responsive personal portfolio website built with React and Tailwind CSS featuring smooth animations and dark mode.', category: 'web', image_url: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80', live_url: '', source_url: 'https://github.com/Mehrab30-Mehrab', technologies: 'React, Tailwind CSS, Framer Motion', featured: true, sort_order: 0, visible: true },
    { id: 2, title: 'Task Management App', description: 'A full-stack task management application with user authentication, real-time updates, and collaborative features.', category: 'web', image_url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80', live_url: '', source_url: 'https://github.com/Mehrab30-Mehrab', technologies: 'Node.js, Express, MongoDB, React', featured: false, sort_order: 1, visible: true },
    { id: 3, title: 'Weather Dashboard', description: 'A responsive weather application that displays real-time weather data with beautiful visualizations.', category: 'web', image_url: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&q=80', live_url: '', source_url: 'https://github.com/Mehrab30-Mehrab', technologies: 'JavaScript, API Integration, CSS', featured: false, sort_order: 2, visible: true },
    { id: 4, title: 'Library Management System', description: 'A comprehensive library management system built with Java featuring inventory tracking and user management.', category: 'app', image_url: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80', live_url: '', source_url: 'https://github.com/Mehrab30-Mehrab', technologies: 'Java, OOP, File I/O', featured: false, sort_order: 3, visible: true },
    { id: 5, title: 'Chat Application', description: 'Real-time chat application with private messaging, group chats, and file sharing capabilities.', category: 'app', image_url: 'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=800&q=80', live_url: '', source_url: 'https://github.com/Mehrab30-Mehrab', technologies: 'Socket.io, Node.js, React', featured: false, sort_order: 4, visible: true },
    { id: 6, title: 'Line Following Robot', description: 'An Arduino-based line following robot with PID control algorithm for smooth and accurate path tracking.', category: 'hardware', image_url: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=800&q=80', live_url: '', source_url: 'https://github.com/Mehrab30-Mehrab', technologies: 'Arduino, C++, Sensors', featured: false, sort_order: 5, visible: true },
  ],
  experience: [
    { id: 1, title: 'Volunteer', organization: 'Amar Shomoy Amar Desh', description: 'Working as a Volunteer at "Amar Shomoy Amar Desh," actively contributing to community development initiatives, assisting in organizing social and charitable programs, and collaborating with team members to create a positive impact through meaningful volunteer work.', start_date: '2026', end_date: null, color: '#7c3aed', sort_order: 0, visible: true },
    { id: 2, title: 'General Secretary of Torquilstone Fortress', organization: 'Triangle Lineage', description: 'Served as an Executive Panel Member at one of the leading Fortresses of Triangle Lineage, where I helped organize and manage multiple charity events, contributing to their successful execution.', start_date: '2022', end_date: '2023', color: '#ec4899', sort_order: 1, visible: true },
    { id: 3, title: 'Campus Ambassador', organization: 'NDEC', description: 'Represented my college on NDC in their 7th National English Fest and promoted learning initiatives through workshops and events.', start_date: '2022', end_date: '2023', color: '#3b82f6', sort_order: 2, visible: true },
    { id: 4, title: 'Volunteer', organization: 'Triangle Lineage', description: 'Worked as an active Volunteer and a Charity Worker and raised funds for different calamities.', start_date: '2019', end_date: '2023', color: '#14b8a6', sort_order: 3, visible: true },
  ],
  social_links: [
    { id: 1, platform: 'GitHub', url: 'https://github.com/Mehrab30-Mehrab', icon: 'fa-brands fa-github', visible: true, sort_order: 0 },
    { id: 2, platform: 'LinkedIn', url: 'https://www.linkedin.com/in/mehrab-morshed-919445237', icon: 'fa-brands fa-linkedin', visible: true, sort_order: 1 },
    { id: 3, platform: 'Facebook', url: 'https://www.facebook.com/share/1CTBgBJ8M2/', icon: 'fa-brands fa-facebook', visible: true, sort_order: 2 },
    { id: 4, platform: 'Instagram', url: 'https://www.instagram.com/whothefuckismehrab', icon: 'fa-brands fa-instagram', visible: true, sort_order: 3 },
    { id: 5, platform: 'WhatsApp', url: 'https://wa.me/qr/J54LFB7CAU2BP1', icon: 'fa-brands fa-whatsapp', visible: true, sort_order: 4 },
  ],
  sections: [
    { id: 1, key: 'hero', label: 'Hero', visible: true, sort_order: 0 },
    { id: 2, key: 'about', label: 'About', visible: true, sort_order: 1 },
    { id: 3, key: 'skills', label: 'Skills', visible: true, sort_order: 2 },
    { id: 4, key: 'projects', label: 'Projects', visible: true, sort_order: 3 },
    { id: 5, key: 'experience', label: 'Experience', visible: true, sort_order: 4 },
    { id: 6, key: 'contact', label: 'Contact', visible: true, sort_order: 5 },
  ],
  messages: [],
};

// Database abstraction layer - works with Supabase or in-memory fallback
const db = {
  async getBio() {
    const client = getSupabase();
    if (!client) return memoryDb.bio;
    const { data } = await client.from('bio').select('*').single();
    return data || memoryDb.bio;
  },

  async updateBio(updates) {
    const client = getSupabase();
    if (!client) {
      Object.assign(memoryDb.bio, updates);
      return memoryDb.bio;
    }
    const { data } = await client.from('bio').update(updates).eq('id', 1).select().single();
    return data;
  },

  async getSkills() {
    const client = getSupabase();
    if (!client) return memoryDb.skills.filter(s => s.visible);
    const { data } = await client.from('skills').select('*').eq('visible', true).order('sort_order');
    return data || [];
  },

  async getAllSkills() {
    const client = getSupabase();
    if (!client) return memoryDb.skills;
    const { data } = await client.from('skills').select('*').order('sort_order');
    return data || [];
  },

  async createSkill(skill) {
    const client = getSupabase();
    if (!client) {
      const newSkill = { id: memoryDb.skills.length + 1, ...skill, visible: true };
      memoryDb.skills.push(newSkill);
      return newSkill;
    }
    const { data } = await client.from('skills').insert(skill).select().single();
    return data;
  },

  async updateSkill(id, updates) {
    const client = getSupabase();
    if (!client) {
      const idx = memoryDb.skills.findIndex(s => s.id === id);
      if (idx !== -1) Object.assign(memoryDb.skills[idx], updates);
      return memoryDb.skills[idx];
    }
    const { data } = await client.from('skills').update(updates).eq('id', id).select().single();
    return data;
  },

  async deleteSkill(id) {
    const client = getSupabase();
    if (!client) {
      memoryDb.skills = memoryDb.skills.filter(s => s.id !== id);
      return true;
    }
    await client.from('skills').delete().eq('id', id);
    return true;
  },

  async getProjects() {
    const client = getSupabase();
    if (!client) return memoryDb.projects.filter(p => p.visible);
    const { data } = await client.from('projects').select('*').eq('visible', true).order('sort_order');
    return data || [];
  },

  async getAllProjects() {
    const client = getSupabase();
    if (!client) return memoryDb.projects;
    const { data } = await client.from('projects').select('*').order('sort_order');
    return data || [];
  },

  async createProject(project) {
    const client = getSupabase();
    if (!client) {
      const newProject = { id: memoryDb.projects.length + 1, ...project, visible: true, created_at: new Date().toISOString() };
      memoryDb.projects.push(newProject);
      return newProject;
    }
    const { data } = await client.from('projects').insert(project).select().single();
    return data;
  },

  async updateProject(id, updates) {
    const client = getSupabase();
    if (!client) {
      const idx = memoryDb.projects.findIndex(p => p.id === id);
      if (idx !== -1) Object.assign(memoryDb.projects[idx], updates);
      return memoryDb.projects[idx];
    }
    const { data } = await client.from('projects').update(updates).eq('id', id).select().single();
    return data;
  },

  async deleteProject(id) {
    const client = getSupabase();
    if (!client) {
      memoryDb.projects = memoryDb.projects.filter(p => p.id !== id);
      return true;
    }
    await client.from('projects').delete().eq('id', id);
    return true;
  },

  async getExperience() {
    const client = getSupabase();
    if (!client) return memoryDb.experience.filter(e => e.visible);
    const { data } = await client.from('experience').select('*').eq('visible', true).order('sort_order');
    return data || [];
  },

  async getAllExperience() {
    const client = getSupabase();
    if (!client) return memoryDb.experience;
    const { data } = await client.from('experience').select('*').order('sort_order');
    return data || [];
  },

  async createExperience(exp) {
    const client = getSupabase();
    if (!client) {
      const newExp = { id: memoryDb.experience.length + 1, ...exp, visible: true };
      memoryDb.experience.push(newExp);
      return newExp;
    }
    const { data } = await client.from('experience').insert(exp).select().single();
    return data;
  },

  async updateExperience(id, updates) {
    const client = getSupabase();
    if (!client) {
      const idx = memoryDb.experience.findIndex(e => e.id === id);
      if (idx !== -1) Object.assign(memoryDb.experience[idx], updates);
      return memoryDb.experience[idx];
    }
    const { data } = await client.from('experience').update(updates).eq('id', id).select().single();
    return data;
  },

  async deleteExperience(id) {
    const client = getSupabase();
    if (!client) {
      memoryDb.experience = memoryDb.experience.filter(e => e.id !== id);
      return true;
    }
    await client.from('experience').delete().eq('id', id);
    return true;
  },

  async getSocialLinks() {
    const client = getSupabase();
    if (!client) return memoryDb.social_links.filter(s => s.visible);
    const { data } = await client.from('social_links').select('*').eq('visible', true).order('sort_order');
    return data || [];
  },

  async getSections() {
    const client = getSupabase();
    if (!client) return memoryDb.sections;
    const { data } = await client.from('sections').select('*').order('sort_order');
    return data || [];
  },

  async updateSection(id, updates) {
    const client = getSupabase();
    if (!client) {
      const idx = memoryDb.sections.findIndex(s => s.id === id);
      if (idx !== -1) Object.assign(memoryDb.sections[idx], updates);
      return memoryDb.sections[idx];
    }
    const { data } = await client.from('sections').update(updates).eq('id', id).select().single();
    return data;
  },

  async getMessages() {
    const client = getSupabase();
    if (!client) return memoryDb.messages;
    const { data } = await client.from('messages').select('*').order('created_at', { ascending: false });
    return data || [];
  },

  async createMessage(msg) {
    const client = getSupabase();
    if (!client) {
      const newMsg = { id: memoryDb.messages.length + 1, ...msg, read: false, created_at: new Date().toISOString() };
      memoryDb.messages.unshift(newMsg);
      return newMsg;
    }
    const { data } = await client.from('messages').insert(msg).select().single();
    return data;
  },

  async markMessageRead(id) {
    const client = getSupabase();
    if (!client) {
      const idx = memoryDb.messages.findIndex(m => m.id === id);
      if (idx !== -1) memoryDb.messages[idx].read = true;
      return true;
    }
    await client.from('messages').update({ read: true }).eq('id', id);
    return true;
  },

  async deleteMessage(id) {
    const client = getSupabase();
    if (!client) {
      memoryDb.messages = memoryDb.messages.filter(m => m.id !== id);
      return true;
    }
    await client.from('messages').delete().eq('id', id);
    return true;
  },

  // Storage - upload image to Supabase storage
  async uploadImage(file, fileName) {
    const client = getSupabase();
    const bucket = process.env.SUPABASE_STORAGE_BUCKET || 'project-images';
    if (!client) {
      // Return a placeholder URL for dev
      return `/uploads/${fileName}`;
    }
    const { data, error } = await client.storage
      .from(bucket)
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });
    if (error) throw error;
    const { data: urlData } = client.storage.from(bucket).getPublicUrl(data.path);
    return urlData.publicUrl;
  },

  async deleteImage(filePath) {
    const client = getSupabase();
    const bucket = process.env.SUPABASE_STORAGE_BUCKET || 'project-images';
    if (!client) return true;
    const fileName = filePath.split('/').pop();
    await client.storage.from(bucket).remove([fileName]);
    return true;
  },
};

function initializeDatabase() {
  const client = getSupabase();
  if (client) {
    console.log('✅ Connected to Supabase');
  } else {
    console.log('✅ Using in-memory database (configure Supabase in .env for persistence)');
  }
}

module.exports = { db, initializeDatabase, getSupabase };