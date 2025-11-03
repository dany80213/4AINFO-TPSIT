const { createApp } = Vue;

createApp({
    data() {
        
        return {
            eta: 19,
            messaggioEta: this.eta >= 18 ? "Maggiorenne" : "Minorenne",
            carrelloArray: [
                        { nome: "Mela", prezzo: 1.2 },
                        { nome: "Banana", prezzo: 0.8 },
                        { nome: "Arancia", prezzo: 1.5 }
                    ],
            username: '',
            erroreUsername: '',
            contenuto: '',
            statoSalvataggio: ''
        }

    },
    methods: {
        toggle(){
            this.luceAccesa = !this.luceAccesa
            this.valore = this.luceAccesa ? "La luce è accesa" : "La luce è spenta"
        },
        formValidate(){
            this.formInviato = true

        },
        handleChange(event) {
            this.statoSalvataggio = "Sto salvando...";
            clearTimeout(this.salvataggioTimeout);
            this.salvataggioTimeout = setTimeout(() => {
                this.statoSalvataggio = "Salvato!";
            }, 1000);
        }

    },
    computed: {
        carrello() {
            let totale = 0;
            for (let i = 0; i < this.carrelloArray.length; i++) {
                totale += this.carrelloArray[i].prezzo;
            }
            return totale;
        }


    },
    watch: {
        username(newVal) {
            this.erroreUsername = newVal.length < 5 ? "L'username deve contenere almeno 5 caratteri" : '';
        },
        contenuto() {
            this.statoSalvataggio = "Sto salvando...";
            clearTimeout(this.salvataggioTimeout);
            this.salvataggioTimeout = setTimeout(() => {
                this.statoSalvataggio = "Salvato!";
            }, 1000);
        }
    }

}).mount('#app');

