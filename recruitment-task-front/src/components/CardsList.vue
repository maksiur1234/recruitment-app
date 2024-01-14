<template>
  <div>
    <h2>Cards List</h2>
    <ul>
      <li v-for="(card, index) in cards.data" :key="index">
        <strong>Card Number:</strong> {{ card.card_number }}<br>
        <strong>PIN:</strong> {{ card.pin }}<br>
        <strong>Activation Date:</strong> {{ card.activationDate }}<br>
        <strong>Expiration Date:</strong> {{ card.expirationDate }}<br>
        <strong>Balance:</strong> {{ formatDecimal(card.balance) }} PLN<br>
        <button @click="deleteCard(index)">Delete</button>
        |
        <button @click="showUpdateForm(card)">Update</button>
      </li>
    </ul>
    <div>
      <button @click="loadCards(cards.current_page - 1)" :disabled="cards.current_page === 1">Previous Page</button>
      <span>Page {{ cards.current_page }} of {{ cards.last_page }}</span>
      <button @click="loadCards(cards.current_page + 1)" :disabled="cards.current_page === cards.last_page">Next Page</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cards: {
      type: Object,
      required: true,
      default: () => ({ data: [], current_page: 1, last_page: 1 }),
    },
  },
  methods: {
    formatDecimal(decimalValue) {
      return parseFloat(decimalValue).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    },
    deleteCard(index) {
      this.$emit('cardDeleted', index);
    },
    showUpdateForm(card) {
      this.$emit('cardUpdated', card);
    },
    loadCards(page) {
      this.$emit('loadCards', page);
    },
  },
};
</script>

<style scoped>
div {
  max-width: 600px;
  margin: auto;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #333;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

strong {
  font-weight: bold;
}

button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

button:hover {
  background-color: #d32f2f;
}
</style>
