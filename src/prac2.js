import axios from 'axios';
import * as cheerio from 'cheerio';

// const axios = require('axios');

axios.get('https://example.com').then(resp=>{
    return resp.data;
}).then(data =>{
    // console.log(data);
    const $ = cheerio.load(data);
    const header = $('h1');
    console.log(header.text());
    const pTags = $('div').children('p');
    console.log(pTags.text());
    
    // get property
    const url = $('a').prop('href');
    console.log(url);

    // map - for
    const ptag = $('p');

    // 아래 수정
    const values = ptag.map((i,elem)=>{
        $(elem).text()
    }).get();
    console.log(values);

    const data2 = []
    for(let i = 0; i <ptag.length; i++){
        data2.push($(ptag[i]).text());
    }

    console.log(data2);

});