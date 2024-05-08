import axios from 'axios';
import * as cheerio from 'cheerio';
import cluster from 'cluster';
import fs from 'fs';
import iconv from 'iconv-lite';
// div class="TableLayout_container__1_Ap4 Main_table__UHAm-" 

async function fetchWadiz(){
    const url = "https://service.wadiz.kr/api/search/funding";
    const resp = await axios.post(url,{"startNum": 96, "order": "recommend", "limit": 200, "categoryCode": "", endYn: ""},
    {});    // get이 아니라 post구나...

    // request 타입은 network의 payload를 확인

    console.log(resp.data);

    const result = resp.data.data.list;
    console.log(result.length);


}


fetchWadiz()