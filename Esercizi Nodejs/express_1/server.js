const express = require("express");
const app = express();
const PORT = 3000;

// ---------------- DATI ----------------
const frasiCookie = [
  "Oggi è il giorno giusto per iniziare.",
  "Un piccolo passo porta lontano.",
  "La pazienza è la chiave del successo.",
  "Sorridi: attiri cose belle.",
  "Fidati del tuo istinto.",
  "Una sorpresa ti aspetta presto.",
  "Le difficoltà allenano la forza.",
  "Se ci credi, trovi la via.",
  "Le buone idee arrivano camminando.",
  "La fortuna aiuta chi ci prova.",
  "Non rimandare ciò che puoi fare ora.",
  "Ogni fine è un nuovo inizio.",
  "Ascolta di più, capirai meglio.",
  "Oggi puoi cambiare rotta.",
  "La costanza batte il talento.",
  "Sii gentile: torna sempre indietro.",
  "La curiosità apre porte.",
  "Un incontro sarà importante.",
  "Resta semplice, resta vero.",
  "Il coraggio nasce dalle scelte.",
];

const proverbi = [
  "Chi dorme non piglia pesci.",
  "Meglio tardi che mai.",
  "Non è tutto oro quel che luccica.",
  "Tra il dire e il fare c’è di mezzo il mare.",
  "Ride bene chi ride ultimo.",
  "Chi va piano va sano e va lontano.",
  "A caval donato non si guarda in bocca.",
  "L’abito non fa il monaco.",
  "Prevenire è meglio che curare.",
  "Chi trova un amico trova un tesoro.",
  "Il mattino ha l’oro in bocca.",
  "Moglie e buoi dei paesi tuoi.",
  "Chi troppo vuole nulla stringe.",
  "Sbagliando si impara.",
  "Volere è potere.",
  "Chi la fa l’aspetti.",
  "Una rondine non fa primavera.",
  "Tutto fumo e niente arrosto.",
  "Finché c’è vita c’è speranza.",
  "L’unione fa la forza.",
];

// ---------------- STATISTICHE SEMPLICI ----------------
let countCookie = new Array(frasiCookie.length).fill(0);
let countProverbi = new Array(proverbi.length).fill(0);

let totaleCookie = 0;
let totaleProverbi = 0;

// ---------------- FUNZIONI ----------------
function pickRandomIndex(arr) {
  return Math.floor(Math.random() * arr.length);
}

function sendHtml(title, message) {
  return `<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8"/>
<title>${title}</title>
</head>
<body style="font-family:sans-serif;margin:40px;">
<h1>${title}</h1>
<div>${message}</div>
<hr>
<a href="/cookie">/cookie</a> |
<a href="/proverbi">/proverbi</a> |
<a href="/stats">/stats</a>
</body>
</html>`;
}

// ---------------- ROUTES ----------------
app.get("/", (req, res) => {
  res.send(sendHtml("Home", "Vai su /cookie o /proverbi"));
});

app.get("/cookie", (req, res) => {
  const i = pickRandomIndex(frasiCookie);
  countCookie[i]++;   
  totaleCookie++;

  res.send(sendHtml("Biscotto della fortuna", frasiCookie[i]));
});

app.get("/proverbi", (req, res) => {
  const i = pickRandomIndex(proverbi);
  countProverbi[i]++;
  totaleProverbi++;

  res.send(sendHtml("Proverbio", proverbi[i]));
});

// ---------------- STATISTICHE ----------------
app.get("/stats", (req, res) => {
  let html = `<h2>Cookie totali: ${totaleCookie}</h2><ul>`;
  for (let i = 0; i < frasiCookie.length; i++) {
    html += `<li>${countCookie[i]} — ${frasiCookie[i]}</li>`;
  }
  html += `</ul><h2>Proverbi totali: ${totaleProverbi}</h2><ul>`;
  for (let i = 0; i < proverbi.length; i++) {
    html += `<li>${countProverbi[i]} — ${proverbi[i]}</li>`;
  }
  html += "</ul>";

  res.send(sendHtml("Statistiche", html));
});


app.get("/export/cookie.json", (req, res) => {
  res.json(frasiCookie);
});

app.get("/export/proverbi.json", (req, res) => {
  res.json(proverbi);
});


app.use((req, res) => {
  res.status(404).send(sendHtml("404", "Pagina non trovata"));
});

app.listen(PORT, () => {
  console.log("Server attivo su http://localhost:" + PORT);
});