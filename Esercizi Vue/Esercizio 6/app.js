const { createApp } = Vue;

const ProductCard = {
  props: ['nomeProdotto', 'prezzo'],
  template: `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ nomeProdotto }}</h5>
        <p class="card-text">Prezzo: € {{ prezzo.toFixed(2) }}</p>
      </div>
    </div>
  `
};

const AlertBox = {
  props: {
    messaggio: { type: String, required: true },
    tipo: { type: String, required: true, validator: v => ['success', 'error'].includes(v) }
  },
  template: `
    <div :class="tipo" class="p-3 text-white rounded" role="alert" :aria-live="tipo === 'error' ? 'assertive' : 'polite'">
      {{ messaggio }}
    </div>
  `
};

const ModalDialog = {
  template: `
    <div class="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
         style="background: rgba(0,0,0,0.5); z-index: 1050;">
      <div class="bg-white p-4 rounded shadow">
        <h5 class="mb-3">Modale</h5>
        <button class="btn btn-secondary" @click="$emit('chiudi')">Chiudi</button>
      </div>
    </div>
  `
};

const StarRating = {
  template: `
    <div>
      <button v-for="i in 5" :key="i" class="btn btn-outline-warning me-1"
              @click="$emit('imposta-valutazione', i)">★</button>
    </div>
  `
};

createApp({
    data() {
        return {
            prodotti: [
                { nomeProdotto: 'Laptop', prezzo: 999 },
                { nomeProdotto: 'Mouse', prezzo: 25 },
                { nomeProdotto: 'Tastiera', prezzo: 49.9 }
            ],
            modaleAperta: false,
            valutazione: 0
        }
    },
    methods: {

    },
    computed: {

    },
    watch: {

    },
    components: {

        ProductCard,
        AlertBox,
        ModalDialog,
        StarRating
    }

}).mount('#app');





