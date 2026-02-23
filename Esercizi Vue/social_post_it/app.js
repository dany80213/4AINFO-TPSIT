const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const app = express();
const PORT = 3000;

const DATA_FILE = path.join(__dirname, "post.json");
const UPLOAD_DIR = path.join(__dirname, "uploads");


if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(UPLOAD_DIR));

// 3) multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const safeOriginal = file.originalname.replace(/\s+/g, "_");
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + "-" + safeOriginal);
  },
});
const upload = multer({ storage });

// 4) helper lettura/scrittura JSON
function readPosts() {
  try {
    if (!fs.existsSync(DATA_FILE)) return [];
    const raw = fs.readFileSync(DATA_FILE, "utf8");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

function writePosts(posts) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2));
}

// ROUTES

// Form (EJS)
app.get("/post", (req, res) => {
  res.render("post");
});

// Salvataggio + upload immagine
app.post("/post", upload.single("image"), (req, res) => {
  const posts = readPosts();

  const { message, description } = req.body;

  const newPost = {
    id: Date.now().toString(),
    message: message?.trim() || "",
    description: description?.trim() || "",
    // se non carichi immagine, rimane vuoto
    imagePath: req.file ? `/uploads/${req.file.filename}` : "",
    imageName: req.file ? req.file.filename : "",
    createdAt: new Date().toISOString(),
  };

  posts.push(newPost);
  writePosts(posts);

  res.redirect("/postGallery");
});

// Gallery dei post
app.get("/postGallery", (req, res) => {
  const posts = readPosts().slice().reverse(); 
  res.render("postGallery", { posts });
});

app.get("/gallery", (req, res) => {
  const posts = readPosts().slice().reverse();
  res.render("postGallery", { posts });
});

// Post specifico cliccando un’immagine
app.get("/post/:id", (req, res) => {
  const posts = readPosts();
  const post = posts.find((p) => p.id === req.params.id);

  if (!post) return res.status(404).send("Post non trovato");
  res.render("postDetail", { post });
});

app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}/post`);
});