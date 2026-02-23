
const express = require("express");
const app = express()

const PORT = 3000;

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

function pickRandom(arr) {
  const i = Math.floor(Math.random() * arr.length);
  return arr[i];
} 

function sendHtml(title, message) {
return (`<!doctype html>
<html lang="it">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <style>
    body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial; margin: 40px; }
    .box { max-width: 700px; padding: 20px; border: 1px solid #ddd; border-radius: 12px; }
    code { background: #f5f5f5; padding: 2px 6px; border-radius: 6px; }
    a { text-decoration: none; }
  </style>
</head>
<body>
  <div class="box">
    <h1>${title}</h1>
    <p>${message}</p>
    <p>
      Vai su:
      <a href="/cookie"><code>/cookie</code></a>
      oppure
      <a href="/proverbi"><code>/proverbi</code></a>
    </p>
  </div>
</body>
</html>`);
}


app.get("/",(req,res) => {
    res.send(sendHtml(
        "Webserver frasi casuali",
        "Scegli un sottoindirizzo per ottenere una frase casuale ad ogni accesso."
    ));
});

app.get("/cookie",(req,res) => {
    const frase = pickRandom(frasiCookie);
    res.send(sendHtml("Biscotto della fortuna", frase));
});


app.get("/proverbi",(req,res) => {
    const proverbio = pickRandom(proverbi);
    res.send(sendHtml("Proverbio", proverbio));
});


app.use((req, res) => {
    res.status(404).send(
      sendHtml(
        "404 - Indirizzo non valido",
        `L'indirizzo <code>${req.originalUrl}</code> non esiste. Usa <code>/cookie</code> o <code>/proverbi</code>.`
      )
    );
  });
app.listen(PORT, () => {
  console.log(`Server attivo su http://localhost:${PORT}`);
});