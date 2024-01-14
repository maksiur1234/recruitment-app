<template>
  <form @submit.prevent="updateCard">
    <h2>Update Card</h2>
    <label for="pin">New PIN:</label>
    <input type="number" id="pin" v-model="updatedCard.pin" required>
    <button type="submit">Update PIN</button>
    <button type="button" @click="cancelUpdate">Cancel</button>
  </form>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      required: true,
    },
    onUpdate: {
      type: Function,
      required: true,
    },
    onCancelUpdate: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      updatedCard: {
        id: null,
        pin: '',
      },
    };
  },
  mounted() {
    this.updatedCard.id = this.card.id;
  },
  methods: {
    updateCard() {
      this.onUpdate(this.updatedCard);
      this.resetForm();
    },
    cancelUpdate() {
      this.onCancelUpdate();
      this.resetForm();
    },
    resetForm() {
      this.updatedCard.pin = '';
    },
  },
};
</script>

<style scoped>

</style>
