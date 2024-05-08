import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';

async function scrapeStockPage(p){
    // const url = `https://finance.naver.com/item/sise_day.naver?code=005930&page=${p}`;
    const resp = await axios.get('https://finance.naver.com/item/sise_day.naver', {
        params: {
            code: '005930',
            page: p
        },
        headers:{
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
        }
    });
    // console.log(resp.data);
    const data = await resp.data;
    const $ = cheerio.load(data);
    const allStock = $('tr[onmouseover]');
    // console.log(allStock)
    // console.log(data);
    const stockData = allStock.map((i,el)=>{
        return parseSise($(el));
    }).get();
    
    // return await Promise.all(stockData)
    return stockData;

}   

// scrapeStockPage(1);

function parseSise(newsElem) {
    const date = newsElem.find("td span.tah.p10.gray03").text();
    const closingPrice = newsElem.find(".num .tah.p11").eq(0).text();
    const upOrDown = newsElem.find(".num .bu_p .blind").text();
    const compare = newsElem.find(".num .tah.p11").eq(1).text().trim();
    const marketPrice = newsElem.find(".num .tah.p11").eq(2).text();
    const highPrice = newsElem.find(".num .tah.p11").eq(3).text();
    const lowPrice = newsElem.find(".num .tah.p11").eq(4).text();
    return {
      date,
      closingPrice,
      upOrDown,
      compare,
      marketPrice,
      highPrice,
      lowPrice,
    };
  }
async function main(){
    let allData = []

    for(let i = 1; i<3; i++){
        const data = await scrapeStockPage(i);
        console.log(data);
        allData = allData.concat(data);

        // console.log(allData);
    }
    // console.log(allData);
    

    const result = JSON.stringify(allData);
    console.log(result);
    fs.writeFileSync('NAVER.json', result);

}

main()