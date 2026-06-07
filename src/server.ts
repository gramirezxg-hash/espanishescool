import express from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(express.json({ limit: '50mb' }));

// Database path
const dbPath = path.join(process.cwd(), 'server', 'db.json');

// Helper to read database
const readDb = () => {
  try {
    if (!fs.existsSync(dbPath)) {
      // Create with default empty structure if doesn't exist
      const defaultDb = {
        logo: { text: "Espanishescool", subtitle: "Academia", letter: "E", bgColor: "#226D7A", textColor: "#FFFFFF" },
        socialLinks: [],
        hero: { title: "Aprende el español que realmente se habla en México", subtitle: "Clases personalizadas de inmersión 1-a-1", ctaText: "Reserva tu Clase" },
        tutors: [],
        courses: [],
        testimonials: [],
        faqs: []
      };
      fs.writeFileSync(dbPath, JSON.stringify(defaultDb, null, 2), 'utf-8');
      return defaultDb;
    }
    const data = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading database file:", error);
    return {};
  }
};

// Helper to write database
const writeDb = (data: any) => {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error("Error writing database file:", error);
    return false;
  }
};

// --- API Endpoints ---

// Get all site data
app.get('/api/data', (req, res) => {
  const data = readDb();
  res.json({ success: true, data });
});

// Save/Update site data
app.post('/api/data', (req, res) => {
  const newData = req.body;
  if (!newData) {
    return res.status(400).json({ success: false, message: "No data provided" });
  }

  const success = writeDb(newData);
  if (success) {
    res.json({ success: true, message: "Data updated successfully", data: newData });
  } else {
    res.status(500).json({ success: false, message: "Failed to write database file" });
  }
});

// --- Production Assets Serving ---

// Serve static files from Vite build in dist folder
const distPath = path.join(process.cwd(), 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  
  // Fallback to index.html for SPA client routing
  app.get('*', (req, res, next) => {
    // If request is for an API endpoint, don't fall back to index.html
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  console.log("Dist folder not found. Web server is running in API-only/development mode.");
}

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
