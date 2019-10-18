import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-5f568.firebaseio.com/'
})


export default instance;