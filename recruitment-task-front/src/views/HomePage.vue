<template>
  <div>
    <CardForm @cardAdded="addCard" />
    <CardsList :cards="cards" @cardDeleted="deleteCard" @loadCards="loadCards" @cardUpdated="showUpdateForm" />
    <CardUpdateForm
        v-if="isUpdateFormVisible"
        :card="selectedCard"
        :onUpdate="updateCard"
        :onCancelUpdate="cancelUpdate"
    />
  </div>
</template>

<script>
import CardForm from '@/components/CardForm.vue';
import CardsList from '@/components/CardsList.vue';
import CardService from '@/services/CardService';
import CardUpdateForm from '@/components/CardUpdateForm.vue';

export default {
  components: {
    CardForm,
    CardsList,
    CardUpdateForm,
  },
  data() {
    return {
      cards: {
        data: [],
        current_page: 1,
        last_page: 1,
      },
      isUpdateFormVisible: false,
      selectedCard: null,
    };
  },
  mounted() {
    this.loadCards();
  },
  methods: {
    async loadCards(page = 1) {
      try {
        const response = await CardService.getAllCards(page);
        this.cards = response.data;
      } catch (error) {
        console.error('Error loading cards:', error);
      }
    },
    async addCard(newCard) {
      try {
        await CardService.addCard(newCard);
        this.loadCards();
      } catch (error) {
        console.error('Error adding card:', error);
      }
    },
    async deleteCard(index) {
      const cardId = this.cards.data[index].id;
      try {
        await CardService.deleteCard(cardId);
        this.loadCards();
      } catch (error) {
        console.error('Error deleting card:', error);
      }
    },
    showUpdateForm(card) {
      this.selectedCard = card;
      this.isUpdateFormVisible = true;
    },
    cancelUpdate() {
      this.selectedCard = null;
      this.isUpdateFormVisible = false;
    },
    async updateCard(updatedCard) {
      const cardId = updatedCard.id;

      if (!cardId) {
        console.error('Card ID is missing in updatedCard.');
        return;
      }

      try {
        await CardService.updateCard(cardId, updatedCard);
        this.loadCards();
      } catch (error) {
        console.error('Error updating card:', error);
      }
    },
  },
};
</script>

<style>
.container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

.header {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
}

.button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2rem;
  margin-right: 10px;
}

.button:hover {
  background-color: #45a049;
}
</style>
