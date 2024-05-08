import axios from 'axios';
import * as cheerio from 'cheerio';
import cluster from 'cluster';
import fs from 'fs';
import iconv from 'iconv-lite';


async function scrapeStockPage(p){
    //https://finance.naver.com/item/news_notice.naver?code=005930&page=2
    const resp = await axios.get('https://finance.naver.com/item/news_notice.naver', {
        params: {
            code: '005930',
            page: p, 
        },
        headers:{
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
        },
        responseType: "arraybuffer"
    });
    // console.log(resp.data);
    

    const data = iconv.decode(resp.data, 'EUC-KR').toString();
    // console.log(data);

    const $ = cheerio.load(data);
    const allStock = $('tbody tr');
    // console.log(allStock)
    // console.log(data);
    const stockData = allStock.map((i,el)=>{
        return parseSise($(el));
    }).get();

    console.log(stockData);
    
    // return await Promise.all(stockData)
    return stockData;

}   


function parseSise(newsElem) {

    const title = newsElem.find("td.title").text();
    const info = newsElem.find("td.info").text();
    const showDate = newsElem.find("td.date").text();

    return {
        title,info,showDate
    };
  }


  scrapeStockPage(1);