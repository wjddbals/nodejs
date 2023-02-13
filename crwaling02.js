//hanb.co.kr사이트에서 새로나온책에 대한 정보를 긁어오기
//https://www.hanbit.co.kr/store/books/new_book_list.html

//사용할 패키지 가져오기:require()
const axios=require('axios'); //ajax 라이브러리
const cheerio=require('cheerio'); //dom 라이브러리

async function main (){  //비동기 입출력 지원 함수 정의

    //접속할 url지정
    const URl='https://www.hanbit.co.kr/store/books/new_book_list.html';

    //axios로 접속해서 html불러옴
     const html=await axios.get(URl);  //비동기 i/o 지원

    //불러온 html을 parsing해서 dom 생성
    const dom = cheerio.load(html.data);
    //console.log(dom);

    //css 선택자로 도서제목을 담도서재목 추출
    let elements =dom('.book_tit');

    //찾은요소를 순회하면서 요소의 텍스트 출력
    elements.each((idx,title)=>{
        console.log(dom(title).text());//글자만 긁어오기
    });

    //css 선틱자로 저자 담고 있는 요소 지정//****
    elements =dom('.book_writer');

    elements.each((idx,writer)=>{
        console.log(dom(writer).text());//글자만 긁어오기
    });


    //css 선틱자로 가격 담고 있는 요소 지정
    elements =dom('.price');

    elements.each((idx,price)=>{
        console.log(dom(price).text());//글자만 긁어오기
    });

};
main();