import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
// const axios = require('axios');

async function scrapeQuote(url){

  const res = await axios.get(url);
  // console.log(res);
  const data = res.data;
  // console.log(data);

  const $ = cheerio.load(data); // 관례상 $를 사용.
  const ulTags = $("ul.c-list-basic").children("li");   // ul.c-list-basic > li로 접근 가능...
  const quotes = [];
  for (let i = 0; i < ulTags.length; i++) {
    quotes.push(getQData($(ulTags[i])));
  }
//   console.log(quotes);
  // json 타입을 리턴
  function getQData(tagObj) {
    const jsonResult = {
      subject: tagObj.find("div.item-title").text(),
      summary: tagObj.find("p.conts-desc.clamp-g2").text(),
      newspaper: tagObj.find("a.item-writer").text(),   
      time: tagObj.find("span.gem-subinfo").text(),
      url: tagObj.find("p.conts-desc.clamp-g2 a").prop('href'),
      image: tagObj.find('.c-item-content img').prop('src'),
    };
    return jsonResult;
  }

  return quotes;

}

async function main(){
  let allQuotes = [];

  for (let page = 1; page <= 3; page++) {
    const quotes = await scrapeQuote(`https://search.daum.net/search?w=news&nil_search=btn&DA=PGD&enc=utf8&cluster=y&cluster_page=2&q=%EA%B8%88%EC%9C%B5+%EC%84%9C%EB%B9%84%EC%8A%A4&p=${page}`);
    allQuotes = allQuotes.concat(quotes);
  }
  console.log(allQuotes);
 
  let data = JSON.stringify(allQuotes);

  fs.writeFile('news_list.json', data, (err)=>{
    console.error(err);
  })
// const sample = await scrapeQuote("https://search.daum.net/search?w=news&nil_search=btn&DA=PGD&enc=utf8&cluster=y&cluster_page=2&q=%EA%B8%88%EC%9C%B5+%EC%84%9C%EB%B9%84%EC%8A%A4&p=1");
// console.log(sample);
}

main()
