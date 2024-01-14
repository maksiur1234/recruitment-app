import axios from 'axios';

axios.defaults.headers.common['X-CSRF-TOKEN'] = document.head.querySelector('meta[name="csrf-token"]').content;

const sanctumToken = localStorage.getItem('authToken');
if (sanctumToken) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${sanctumToken}`;
}
