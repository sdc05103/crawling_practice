import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';

async function scrapeNewsSearchPage(query, page){
    // const url = `https://search.daum.net/search?w=news&cluster=y&q=${query}&p=${page}`;
    const resp = await axios.get('https://search.daum.net/search', {
        params: {
            w: 'news',
            cluster: 'y',
            q: query,
            p: page
        }
    });
    const data = await resp.data;
    const $ = cheerio.load(data);
    const newsList = $('ul.c-list-basic > li');
    newsList.map((i,el)=>{
        return parseNews($(el));
    }).get();
    // console.log(newsParsed);
}   

async function parseNews(newsElem){
    
    // const titleAnchor = newsElem.find('.c-item-content .item-title a');
    const url = newsElem.find("p.conts-desc.clamp-g2 a").prop('href');

    const response = await fetch(url);
    const htmlData = await response.text();
   
    saveHtmlData(htmlData, 'saved_html.html');
}

function saveHtmlData(html, fileName) {
    fs.writeFileSync(fileName, html, 'utf8')
    // console.log("HTML 데이터 저장:", html);
}

scrapeNewsSearchPage("금융 서비스", 1);

