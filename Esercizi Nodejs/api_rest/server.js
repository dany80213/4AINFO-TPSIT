const express = require("express");
const app = express();
const cors = require("cors");
const itemsRoutes = require("./routes/items");
// Middleware
app.use(cors())
app.use(express.json());
// Rotte
app.use("/api/items", itemsRoutes);
// Avvio server
const PORT = 3000;
app.listen(PORT, () => {
console.log(`Server attivo su http://localhost:${PORT}`);
});