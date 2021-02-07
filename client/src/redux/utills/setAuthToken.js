import axios from 'axios';

const setAuthToken = token => {
    if(token) {
        //Apply to every request
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        // Deleate auth header
        delete axios.defaults.headers.common['Authorzation'];
    }
}

export default setAuthToken;