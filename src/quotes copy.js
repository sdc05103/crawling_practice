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
  const divTags = $("div.quote");
  const quotes = [];
  for (let i = 0; i < divTags.length; i++) {
    quotes.push(getQData($(divTags[i])));
  }
//   console.log(quotes);
  // json 타입을 리턴
  function getQData(tagObj) {
    const jsonResult = {
      context: tagObj.children("span.text").text(),
      author: tagObj.find("span small.author").text(),
      tags: tagObj
        .find("a.tag")
        .map((i, e) => $(e).text())
        .get(),
    };
    return jsonResult;
  }

  return quotes;

}

async function main(){
  let allQuotes = [];

  for (let page = 1; page <= 10; page++) {
    const quotes = await scrapeQuote(`https://quotes.toscrape.com/page/${page}/`);
    allQuotes = allQuotes.concat(quotes);
  }
  console.log(allQuotes);
 
  let data = JSON.stringify(allQuotes);

  fs.writeFile('q_list.json', data, (err)=>{
    console.error(err);
  })

}

main()

// axios
//     .get("https://quotes.toscrape.com/")

//     .then((res) => {
//       return res.data;
//     })
//     .then((data) => {
//       const $ = cheerio.load(data); // 관례상 $를 사용.
//       const divTags = $("div.quote");
//       const quotes = [];
//       for (let i = 0; i < divTags.length; i++) {
//         quotes.push(getQData($(divTags[i])));
//       }
//     //   console.log(quotes);
//       // json 타입을 리턴
//       function getQData(tagObj) {
//         const jsonResult = {
//           context: tagObj.children("span.text").text(),
//           author: tagObj.find("span small.author").text(),
//           tags: tagObj
//             .find("a.tag")
//             .map((i, e) => $(e).text())
//             .get(),
//         };
//         return jsonResult;
//       }
//       return quotes;
//     })
//     .then((data) => {
//     console.log("type1: ", typeof data);
//       return JSON.stringify(data);
//     })
//     .then((data) => fs.writeFile('quotes_list.json', data, (err)=>{
//         console.error(err)
//     }));

//     // fs.writeFile('quotes_list.json', data, (err)=>{
//     //     console.error(err)
//     // })