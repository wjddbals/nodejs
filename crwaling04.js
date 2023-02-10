//미세먼지 공공테이터 이용해서 특정지역 미세먼지 정보 출력

//https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty
// ?serviceKey=jpe6L3k%2B4bb1WZhf5gztMjF8ceaW2SgEwh1V%2BglIC7ZxX8O6z8UjBdE6f3pnrkeHz1%2Bnp8lGb0drUp5bqZq%2Fqw%3D%3D&returnType=xml&numOfRows=100&pageNo=1&sidoName=%EC%84%9C%EC%9A%B8&ver=1.0

//사용할 패키지 가져오기:require()
const axios=require('axios'); //
const cheerio=require('cheerio'); //dom 라이브러리
const fs=require('fs'); //파일 시스템 관련 라이브러리
const path=require('path');//파일 경로 관련 라이브러리
async function main () {  //비동기 입출력 지원 함수 정의

    //접속할 url지정,쿼리스트링,useragent 헤더지정
    const URl = 'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty';
    const params = {
        'servicekey': 'jpe6L3k+4bb1WZhf5gztMjF8ceaW2SgEwh1V+glIC7ZxX8O6z8UjBdE6f3pnrkeHz1+np8lGb0drUp5bqZq/qw==',
        'returnType': 'json', 'sidoName': '전국','numOfRows':500
    };

    const headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.78'};


    //axios로 접속해서 대기오염 정보 받아옴
    const json = await axios.get(URl, {
        params: params,
        headers: headers
    }); //서버요청시 User-Agent 헤더사용

//받아온데이터 잠시 확인
    //console.log(json.data);
    //json으로 블러오기
    let items=json.data['response']['body']['items'];
    //console.log(items);
//미세먼지 정보 출력
    //pm25Value는 출력안됨
    for (let item of items){
        console.log(item.sidoName,item.stationName,item.pm10Value, item.dataTime);
    }

}

main();