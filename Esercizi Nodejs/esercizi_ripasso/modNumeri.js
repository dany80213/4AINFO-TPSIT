const fs = require('fs')
const { nextTick } = require('process')
let testo = ""


function primoDispariSuccessivo(n){
  if(n % 2 == 0 ) {
    return n+1
  }else{
    return n+2
  }
}


function tabellina(n){
  numeri = []

  for(i=1;i<=n;i++){
    numeri.push(n*i)
  }
  return numeri

}

function fibonacciMinoreDi(n){
  let n1=0;n2=1
  nextTerm = n1 + n2;
  let numeri = []

  while (nextTerm <= n) {

    numeri.push(nextTerm)

    n1 = n2;
    n2 = nextTerm;
    nextTerm = n1 + n2;
}

  return numeri

}


function tabellina1a10(nomeFile){
  for (let n = 1; n <= 10; n++) {
    let riga = `Tabellina del ${n}: `;

    for (let i = 1; i <= 10; i++) {
      riga += `${n * i} `;
    }

    testo += riga.trim() + "\n"; 
  }

  fs.writeFileSync(nomeFile, testo, "utf-8");
}


module.exports = {
  primoDispariSuccessivo,
  tabellina,
  fibonacciMinoreDi,
  tabellina1a10
};

