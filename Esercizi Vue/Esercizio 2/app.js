const { createApp } = Vue;

createApp({
    data() {
        return {
           isLoggedIn: false,
           coloreSemaforo : "giallo",
           team: ["Juventus","Milan","Real Madrid"],
           prodotti : [
            {
                "id" : 1,
                "nome" : "Smartphone",
                "prezzo" : 21
            },
            {
                "id" : 2,
                "nome" : "Laptop",
                "prezzo" : 1000
            },
            {
                "id" : 3,
                "nome" : "Tablet",
                "prezzo" : 500
            },
            {
                "id" : 4,
                "nome" : "Smartwatch",
                "prezzo" : 200
            },
            {
                "id" : 5,
                "nome" : "Cuffie",
                "prezzo" : 50
            }
           ]
        }
    }
}).mount('#app');

