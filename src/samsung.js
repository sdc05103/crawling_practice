import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";

async function scrapeNews(url) {
  const res = await axios.get(url);
  const data = res.data;
  const $ = cheerio.load(data);

  const articles = [];
  $("ul.c-list-basic > li").each((index, element) => {
    const title = $(element).find("strong.tit-g.clamp-g").text().trim();
    const url = $(element).find("p.conts-desc.clamp-g2 a").attr("href");
    if (title && url) {
      articles.push({ title, url });
    }
  });

  return articles;
}

async function main() {
  const baseURL = "https://search.daum.net/search?w=news&cluster=y&q=삼성전자";
  const dateRanges = [
    { start: "20240401", end: "20240405" },
    { start: "20240408", end: "20240412" },
    { start: "20240415", end: "20240419" },
  ];

  let results = {};

  for (let range of dateRanges) {
    const url = `${baseURL}&period=u&sd=${range.start}000000&ed=${range.end}235959&p=1`;
    const articles = await scrapeNews(url);
    results[range.end] = articles;
  }

  fs.writeFileSync("samsung.json", JSON.stringify(results, null, 2), "utf8");
}

main();
