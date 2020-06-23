import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://gainz-tracc.firebaseio.com/'
});

export default instance;