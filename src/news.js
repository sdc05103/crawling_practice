import axios from 'axios';


async function fetchKeyword(p){

    // const url = 'https://s.search.naver.com/p/newssearch/search.naver?cluster_rank=302&de=&ds=&eid=&field=0&force_original=&is_dts=0&is_sug_officeid=0&mynews=0&news_office_checked=&nlu_query=&nqx_theme=%7B%22theme%22%3A%7B%22main%22%3A%7B%22name%22%3A%22encyclopedia%22%2C%22score%22%3A%220.895011%22%7D%7D%7D&nso=%26nso%3Dso%3Ar%2Cp%3Aall%2Ca%3Aall&nx_and_query=&nx_search_hlquery=&nx_search_query=&nx_sub_query=&office_category=0&office_section_code=0&office_type=0&pd=0&photo=0&query=%EC%9D%B4%EC%B0%A8%EC%A0%84%EC%A7%80&query_original=&service_area=0&sort=0&spq=0&start=141&where=news_tab_api&nso=so:r,p:all,a:all&_callback=jQuery112403443753472113553_1715161313458&_=1715161313472';
    const resp = await axios.get('https://s.search.naver.com/p/newssearch/search.naver?query=%EC%9D%B4%EC%B0%A8%EC%A0%84%EC%A7%80&', {
        params:{
            start: p
        },
        headers:{
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
        }
    });

    const data = await resp.data;
    const $ = cheerio.load(data);
    
    const a = $('div.news_wrap.api_ani_send')


}

function parseSize(newElem){


}

async function main(){
    let start = 11;

    let allData = [];

    for(let i = 1; i<11; i++){
        const data = await fetchKeyword(i);
        console.log(data);
        allData = allData.concat(data);
        i += 10;
    }

    const result = JSON.stringify(allData);
    console.log(result);

}