import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';

const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
const sanctumToken = csrfTokenMeta ? csrfTokenMeta.content : null;

export default {
    getAllCards(page) {
        return axios.get(`${BASE_URL}/cards?page=${page}`, {
            headers: {
                'X-CSRF-TOKEN': sanctumToken,
                'Authorization': `Bearer ${sanctumToken}`
            }
        });
    },
    addCard(newCard) {
        return axios.post(`${BASE_URL}/cards`, newCard, {
            headers: {
                'X-CSRF-TOKEN': sanctumToken,
                'Authorization': `Bearer ${sanctumToken}`
            }
        });
    },
    deleteCard(cardId) {
        return axios.delete(`${BASE_URL}/cards/${cardId}`, {
            headers: {
                'X-CSRF-TOKEN': sanctumToken,
                'Authorization': `Bearer ${sanctumToken}`
            }
        });
    },
    updateCard(cardId, updatedCard) {
        return axios.put(`${BASE_URL}/cards/${cardId}`, updatedCard, {
            headers: {
                'X-CSRF-TOKEN': sanctumToken,
                'Authorization': `Bearer ${sanctumToken}`
            }
        });
    },
    checkAuthentication() {
        return axios.get(`${BASE_URL}/user`, {
            headers: {
                'X-CSRF-TOKEN': sanctumToken,
                'Authorization': `Bearer ${sanctumToken}`
            }
        });
    },
};
