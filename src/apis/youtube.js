import axios from 'axios';

const KEY = 'AIzaSyAZRk91AYvnum1dYpdxMyjrlkwNuwqFZX4';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        part: 'snippet',
        maxResults: 5,
        key: KEY
    }

})

