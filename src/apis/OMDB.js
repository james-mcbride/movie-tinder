import axios from 'axios';

const KEY = "7348fb7e";

export default axios.create({
    baseURL: 'http://www.omdbapi.com',
    params: {
        apikey: KEY
    }

})