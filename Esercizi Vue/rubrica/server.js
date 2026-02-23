const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, "data", "contacts.json");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Helper functions for reading/writing JSON
async function readContacts() {
  try {
    const data = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist or is empty, return empty array
    return [];
  }
}

async function writeContacts(contacts) {
  await fs.writeFile(DATA_FILE, JSON.stringify(contacts, null, 2), "utf8");
}

// Routes
// 1. Get all contacts
app.get("/api/contacts", async (req, res) => {
  try {
    const contacts = await readContacts();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: "Errore nel caricamento dei contatti" });
  }
});

// 2. Add a new contact
app.post("/api/contacts", async (req, res) => {
  try {
    const { nome, cognome, telefono, email } = req.body;

    // Basic validation
    if (!nome || !cognome || !telefono) {
      return res
        .status(400)
        .json({ error: "Nome, cognome e telefono sono obbligatori" });
    }

    const contacts = await readContacts();

    const newContact = {
      id: Date.now().toString(), // Simple unique ID generator
      nome,
      cognome,
      telefono,
      email: email || "",
    };

    contacts.push(newContact);
    await writeContacts(contacts);

    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ error: "Errore nel salvataggio del contatto" });
  }
});

// 3. Update an existing contact
app.put("/api/contacts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, cognome, telefono, email } = req.body;

    // Basic validation
    if (!nome || !cognome || !telefono) {
      return res
        .status(400)
        .json({ error: "Nome, cognome e telefono sono obbligatori" });
    }

    const contacts = await readContacts();
    const index = contacts.findIndex((c) => c.id === id);

    if (index === -1) {
      return res.status(404).json({ error: "Contatto non trovato" });
    }

    contacts[index] = {
      ...contacts[index],
      nome,
      cognome,
      telefono,
      email: email || "",
    };
    await writeContacts(contacts);

    res.json(contacts[index]);
  } catch (error) {
    res.status(500).json({ error: "Errore nell'aggiornamento del contatto" });
  }
});

// 4. Delete a contact
app.delete("/api/contacts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const contacts = await readContacts();

    const filteredContacts = contacts.filter((c) => c.id !== id);

    if (contacts.length === filteredContacts.length) {
      return res.status(404).json({ error: "Contatto non trovato" });
    }

    await writeContacts(filteredContacts);
    res.json({ message: "Contatto eliminato con successo" });
  } catch (error) {
    res.status(500).json({ error: "Errore nell'eliminazione del contatto" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
});
