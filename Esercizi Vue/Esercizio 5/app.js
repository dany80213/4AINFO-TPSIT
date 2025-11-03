const { createApp } = Vue;

const Hello = {
    template: `
      <div>
        <h2>Ciao, {{ name }}</h2>
      </div>
    `,
    props : ["name"],
  }

const InfoCard = {
    template: `
      <div class="card">
        <div class="card-body">
          <h3 class="card-title">Titolo della Card</h3>
          <p class="card-text">Contenuto della card...</p>
        </div>
      </div>
    `
};

createApp({
    data() {
        
        return {
            message: "Questo è un messaggio",
            hasError:false,
            isSuccess : true,
            avatarWidth: 100,
            avatarHeight: 100,
            avatarColor: 'blue'
        }

    },
    methods: {

    },
    computed: {


    },
    watch: {
    
    },
    components:{
        Hello,
        InfoCard
    }

}).mount('#app');





