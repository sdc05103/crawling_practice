import axios from "axios";
import fs from "fs";

// 주가 데이터를 가져오는 비동기 함수
async function getStockData() {
  const url =
    "https://finance.daum.net/api/charts/A005930/weeks?limit=200&adjusted=true";
  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    Referer: "https://finance.daum.net/quotes/A005930",
    Accept: "application/json, text/plain, */*",
  };

  const response = await axios.get(url, { headers });
  const data = response.data.data;

  // 각 주의 시작일과 종료일을 설정
  const dateRanges = [
    { start: new Date("2024-04-01"), end: new Date("2024-04-05") },
    { start: new Date("2024-04-08"), end: new Date("2024-04-12") },
    { start: new Date("2024-04-15"), end: new Date("2024-04-19") },
  ];

  // 각 주차에 해당하는 데이터를 필터링
  const filteredData = dateRanges
    .map((range) =>
      data.find((item) => {
        const date = new Date(item.date);
        return date >= range.start && date <= range.end;
      })
    )
    .filter(Boolean) // 데이터가 있는 경우에만 필터링
    .map((item) => ({
      date: item.date,
      tradePrice: item.tradePrice,
      openingPrice: item.openingPrice,
      highPrice: item.highPrice,
      lowPrice: item.lowPrice,
      candleAccTradePrice: item.candleAccTradePrice,
    }));

  return filteredData;
}

async function main() {
  try {
    const stockData = await getStockData();
    fs.writeFileSync("stock.json", JSON.stringify(stockData, null, 2), "utf8");
  } catch (error) {
    console.error("Error fetching stock data:", error);
  }
}

main();
