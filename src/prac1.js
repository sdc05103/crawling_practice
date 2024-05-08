import axios from 'axios';

// const axios = require('axios');

axios({
    method: 'GET',
    url: 'https://www.naver.com',
    }).then(response=>{
    console.log(response);
});