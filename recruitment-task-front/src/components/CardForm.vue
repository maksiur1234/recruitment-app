<template>
  <div>
    <h2>Add New Card</h2>
    <form @submit.prevent="submitForm">
      <label for="cardNumber">Card Number:</label>
      <input type="text" id="cardNumber" v-model="cardData.card_number" required>

      <label for="pin">PIN:</label>
      <input type="password" id="pin" v-model="cardData.pin" required>

      <label for="activationDate">Activation Date:</label>
      <input type="datetime-local" id="activationDate" v-model="cardData.activation_date" required>

      <label for="expirationDate">Expiration Date:</label>
      <input type="date" id="expirationDate" v-model="cardData.expiration_date" required>

      <label for="balance">Balance:</label>
      <input type="number" id="balance" v-model="cardData.balance" required>

      <button type="submit">Add Card</button>
      <div v-if="errors.length > 0" class="error-message">
        <p><strong>Error adding card:</strong></p>
        <ul>
          <li v-for="error in errors" :key="error.field">{{ error.message }}</li>
        </ul>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cardData: {
        card_number: '',
        pin: '',
        activation_date: '',
        expiration_date: '',
        balance: 0,
      },
      errors: [],
    };
  },
  methods: {
    async submitForm() {
      try {
        this.$emit('cardAdded', { ...this.cardData });
        // clear form for better ux
        this.resetForm();
      } catch (error) {
        if (error.response && error.response.status === 422) {
          this.errors = error.response.data.errors;
        } else {
          console.error('Error adding card:', error.message);
        }
      }
    },
    resetForm() {
      this.cardData = {
        card_number: '',
        pin: '',
        activation_date: '',
        expiration_date: '',
        balance: 0,
      };
      this.errors = [];
    },
  },
};
</script>

<style scoped>
form {
  max-width: 550px;
  margin: auto;
  padding: 20px;
  background-color: #f07c00;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #fff;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #fff;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
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