//코로나 19 시도별 확진자 데이터를 이용해서 특정 지역의 확진자 현황 출력
//https://apis.data.go.kr/1352000/ODMS_COVID_04/callCovid04Api
// ?serviceKey=jpe6L3k%2B4bb1WZhf5gztMjF8ceaW2SgEwh1V%2BglIC7ZxX8O6z8UjBdE6f3pnrkeHz1%2Bnp8lGb0drUp5bqZq%2Fqw%3D%3D&pageNo=1&numOfRows=500&apiType=json&std_day=2023-02-13&gubun=%EC%84%9C%EC%9A%B8
//코로나 시도별 확진자 데이터를 이용해서 특정 지역의 확진자


//사용할 패키지 가져오기:require(패기지명)
const axios=require('axios'); //

const {XMLParser}=require('fast-xml-parser');//xml처리기 라이브러리
async function main (){  //비동기 입출력 지원 함수 정의

    //접속할 url지정
    //apitype:xml또는 JSON으로 해도 된다 나중에 제이슨으로 해봐야
    const URl='http://apis.data.go.kr/1352000/ODMS_COVID_04/callCovid04Api';
    const params={
        'servicekey':'jpe6L3k+4bb1WZhf5gztMjF8ceaW2SgEwh1V+glIC7ZxX8O6z8UjBdE6f3pnrkeHz1+np8lGb0drUp5bqZq/qw==',
            'apiType':'xml', 'std_day': '2023-02-12','gubun':''
    };

    const headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.78'};


    //axios로 접속해서 xml불러옴
    const xml = await axios.get(URl, {
        params: params,
        headers: headers
    }); //서버요청시 User-Agent 헤더사용
    //console.log(xml.data);

    //xml을 json으로 변환하기
    const parser=new XMLParser();
    let json =parser.parse(xml.data);

    //받아온데이터 잠시 확인
    //console.log(xml.data);

     //console.log(json);
    //json으로 블러오기
    let items = json['response']['body']['items']['item'];
   // console.log(items);

    //지역별 코로나 확진 정보 출력
    //
    for (let item of items) {
        console.log(`지역:${item.gubun},전일확진자수${item.incDec},누적 확진자수:${item.defCnt},
        누적사망자수:${item.deathCnt},측정일:${item.stdDay}`);
    }

};



main();