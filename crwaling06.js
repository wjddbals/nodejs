//영화 제목추출
//https://movie.daum.net/main
//https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty
//?serviceKey=jpe6L3k%2B4bb1WZhf5gztMjF8ceaW2SgEwh1V%2BglIC7ZxX8O6z8UjBdE6f3pnrkeHz1%2Bnp8lGb0drUp5bqZq%2Fqw%3D%3D&returnType=xml&numOfRows=100&pageNo=1&sidoName=%EC%84%9C%EC%9A%B8&ver=1.0

//사용할 패키지 가져오기:require()
const axios=require('axios'); //
const cheerio=require('cheerio'); //dom 라이브러리
const {Builder,Browser,By,Key,until}=require('selenium-webdriver')//알트앤터 눌러 생성하기

async function main () {

    //접속할 url지정
    const URl = 'https://movie.daum.net/main';

    //크롬자동화 즈라우져 객체 생성
    const chrome= await new Builder().forBrowser(Browser.CHROME)
        .setChromeOptions()
        .build();

    try{
        //지정한  url로 접속
        await chrome.get(URl);

        //특정 요소가 화면에 위치할대까지 최대 5초간 기다려줌
        await chrome.wait(until.elementLocated(By.css('.feature_home div:nth-child(3).slide_ranking .tit_item')),5000);

        //접속한 사이트의 html 소스가져옴
        const html= await chrome.getPageSource();
       // console.log(html);

        //5초 정도 잠시 대기
       // await chrome.sleep(5000);//여기는 안써도 되니 참고만 하고
        //페이지 소스를 dom객체로 변환
        const dom = cheerio.load(html);

        //영화제목추출,평점 에매율추출
        let movies=dom('.feature_home div:nth-child(3).slide_ranking .tit_item');
        let rates=dom('.feature_home div:nth-child(3).slide_ranking .tit_num:first-child');
        let rsrvs =dom('.feature_home div:nth-child(3).slide_ranking .tit_num:last-child');

        //추출한 결과를 저장하기 위한 배열 선언
        let moviess=[],ratess=[],rsrvss=[];

        //추출된 영화 ,제목 출력
        movies.each((idx,movie)=>{
            let title=dom(movie).text().trim()
         // console.log(title);
            moviess.push(title);

        });

        //평점추출

        rates.each((idx,rate)=>{
            let point =dom(rate).text().trim();
            //console.log(point);
            ratess.push(point);
        });



        //예매율추출

        rsrvs.each((idx,rsrv)=>{
            let rsrt= dom(rsrv).text().trim();
           // console.log(rsrt);
            rsrvss.push(rsrt);
        });


        //한변에 모아서 출력
        for (let i=0;i <moviess.length; ++i) {
            console.log(`${moviess[i]} ${ratess[i]} ${rsrvss[i]}`);
        }



    }catch (ex){
        console.log(ex);

    }finally {
        await chrome.quit();//크롬브라우져 닫기 작업이 끝나면 닫아주기
    }


};
main();