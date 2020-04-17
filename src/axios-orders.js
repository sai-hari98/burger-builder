import axios from 'axios';

const ordersInstance = axios.create({
    baseURL: 'https://burger-builder-6e1cf.firebaseio.com'
});

export default ordersInstance;