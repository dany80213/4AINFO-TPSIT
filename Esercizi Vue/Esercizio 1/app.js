const { createApp } = Vue;

createApp({
    data() {
        return {
           nome: 'Daniele',
           cognome: 'Porcaro',
           citta: 'Nichelino',
           nomeProdotto : 'Smartphone',
           prezzo : 299.99,
           immagineDisabilitata: true,
            messaggioTooltip: 'Sono un tooltip che appare al passaggio del mouse',
        }
    }
}).mount('#app');

