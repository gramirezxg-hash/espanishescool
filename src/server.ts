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
        adminPassword: "admin123",
        users: [
          {
            id: "u-seed-1",
            name: "James Miller",
            email: "james.miller@gmail.com",
            password: "student123",
            role: "student",
            credits: 10,
            placementLevel: "Sin clasificar. ¡Toma el examen de colocación hoy!"
          }
        ],
        logo: { text: "Espanishescool", subtitle: "Academia", letter: "E", bgColor: "#226D7A", textColor: "#FFFFFF", imageUrl: "" },
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

// --- Authentication & Users Endpoints ---

// Student Registration
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "Todos los campos son obligatorios" });
  }

  const db = readDb();
  if (!db.users) db.users = [];

  const userExists = db.users.some((u: any) => u.email.toLowerCase() === email.toLowerCase());
  if (userExists) {
    return res.status(400).json({ success: false, message: "El correo electrónico ya está registrado" });
  }

  const newUser = {
    id: 'u-' + Date.now(),
    name,
    email: email.toLowerCase(),
    password,
    role: 'student',
    credits: 10,
    placementLevel: 'Sin clasificar. ¡Toma el examen de colocación hoy!'
  };

  db.users.push(newUser);
  writeDb(db);

  // Return user without password
  const { password: _, ...userWithoutPassword } = newUser;
  res.json({ success: true, user: userWithoutPassword });
});

// User Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Todos los campos son obligatorios" });
  }

  const db = readDb();
  if (!db.users) db.users = [];

  const user = db.users.find(
    (u: any) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!user) {
    return res.status(401).json({ success: false, message: "Correo o contraseña incorrectos" });
  }

  const { password: _, ...userWithoutPassword } = user;
  res.json({ success: true, user: userWithoutPassword });
});

// Update Student Profile
app.post('/api/users/update', (req, res) => {
  const { id, name, email, credits, placementLevel } = req.body;
  if (!id) {
    return res.status(400).json({ success: false, message: "ID de usuario requerido" });
  }

  const db = readDb();
  if (!db.users) db.users = [];

  const index = db.users.findIndex((u: any) => u.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: "Usuario no encontrado" });
  }

  db.users[index] = {
    ...db.users[index],
    name: name || db.users[index].name,
    email: email ? email.toLowerCase() : db.users[index].email,
    credits: credits !== undefined ? Number(credits) : db.users[index].credits,
    placementLevel: placementLevel !== undefined ? placementLevel : db.users[index].placementLevel
  };

  writeDb(db);

  const { password: _, ...userWithoutPassword } = db.users[index];
  res.json({ success: true, user: userWithoutPassword });
});

// Verify Admin Password
app.post('/api/auth/verify-admin', (req, res) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ success: false, message: "Contraseña requerida" });
  }

  const db = readDb();
  const adminPassword = db.adminPassword || 'admin123';

  if (password === adminPassword) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: "Contraseña de administrador incorrecta" });
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
