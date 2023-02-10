// JTBC 뉴스 사이트에서 기사제목,요약기사,분류,기자명,송고일자등을 추출
// 추출한 정보들은 JSON 형식으로 data/jtbcnews.json으로 저장
// https://news.jtbc.co.kr/section/list.aspx

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

async function main() {
    const url = 'https://news.jtbc.co.kr/section/list.aspx';
    const headers = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.78';

    const titles = [], previews = [], categorys = [],
        reporters = [], pdates = [];

    const html = await axios.get(url, {
        headers : { 'User-Agent': headers }
    });

    const dom = cheerio.load(html.data);

    // 기사제목
    let data = null;   // 작업용 변수
    let elements = dom('.title_cr');
    elements.each((idx, title) => {
        data = dom(title).text().trim();
        titles.push(data);
    });

    // 요약기사
    elements = dom('.desc.read_cr');
    elements.each((idx, prev) => {
        data = dom(prev).text()
            .replace(/  /g, '').trim();
        previews.push(data);
    });

    // 카테고리
    elements = dom('.location');
    elements.each((idx, cate) => {
        data = dom(cate).text()
            .replace(/\r/g, '')
            .replace(/\n/g, '')
            .replace(/\t/g, '')
            .replace(/ /g, '')
            .replace(/\[/g, '')
            .replace(/\]/g, '')
            .replace(/>/g, ' > ').trim();
        categorys.push(data);
    });

    // 기자명
    elements = dom('.writer');
    elements.each((idx, writer) => {
        data = dom(writer).text()
            .replace(/ 기자/g, '').trim();
        reporters.push(data);
    });

    // 송고날짜
    elements = dom('.info .date');
    elements.each((idx, date) => {
        data = dom(date).text().trim();
        pdates.push(data);
    });

    // 추출한 정보 확인
    console.log(titles.length, previews.length,
        categorys.length, reporters.length, pdates.length);

    // 추출한 정보를 JSON객체로 생성
    let news = [];
    for (let i = 0; i < titles.length; ++i) {
        let newOne = {}
        newOne.title = titles[i];
        newOne.preview = previews[i];
        newOne.category = categorys[i];
        newOne.reporter = reporters[i];
        newOne.pdate = pdates[i];
        news.push(newOne);
    }
    console.log(news);

    // 파일에 저장
    const newsJSON = JSON.stringify(news);
    !fs.existsSync('data') && fs.mkdirSync('data');

    const fpath = path.join(__dirname, 'data', 'jtbcnews.json');//data에 jtbcnews.jon조인한다
    fs.writeFileSync(fpath, newsJSON);
};

main();
