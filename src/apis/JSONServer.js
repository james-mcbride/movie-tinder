import axios from 'axios';

export default axios.create({
    baseURL: "https://apple-veil-game.glitch.me/movies",
    params: {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }

})