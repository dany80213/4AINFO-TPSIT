const { createApp } = Vue;

createApp({
    data() {
        
        return {
           message: "Non hai cliccato il pulsante",
           valore : "La luce è spenta",
           luceAccesa : false,
           chilogrammi : 0,
           nome : "",
           genere: "",
           paese : "",
           formInviato : false

        }

    },
    methods: {
        toggle(){
            this.luceAccesa = !this.luceAccesa
            this.valore = this.luceAccesa ? "La luce è accesa" : "La luce è spenta"
        },
        formValidate(){
            this.formInviato = true

        }

    },
    computed: {
        grammi(){
            return this.chilogrammi * 1000
        }
    }

}).mount('#app');

