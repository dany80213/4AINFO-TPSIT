const modNumeri = require("./modNumeri");

console.log("Dispari successivo:", modNumeri.primoDispariSuccessivo(10));
console.log("Tabellina del 7:  ",modNumeri.tabellina(7));
console.log("Fibonacci:", modNumeri.fibonacciMinoreDi(50));

modNumeri.tabellina1a10("tabelline.txt");
console.log("File tabelline.txt creato");
