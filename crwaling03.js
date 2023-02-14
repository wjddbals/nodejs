//hanb.co.kr사이트에서 새로나온책에 대한 정보를 긁어오기
//https://www.hanbit.co.kr/store/books/new_book_list.html
//https://www.hanbit.co.kr/store/books/new_book_list.html
//사용할 패키지 가져오기:require()
const axios=require('axios'); //
const cheerio=require('cheerio'); //dom 라이브러리
const fs=require('fs'); //파일 시스템 관련 라이브러리
const path=require('path');//파일 경로 관련 라이브러리
async function main (){  //비동기 입출력 지원 함수 정의

    //접속할 url지정
    const URl='https://www.hanbit.co.kr/store/books/new_book_list.html';

    //수집할 개별 정보를 저장하기 위해 배열 선언
    let titles=[],writers=[],prices=[];
    let books=[];

    //axios로 접속해서 html불러옴
     const html=await axios.get(URl,{
         headers:{'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.78'}
     }); //서버요청시 User-Agent 헤더사용

    //불러온 html을 parsing해서 dom 생성
    const dom = cheerio.load(html.data);
    //console.log(dom);

    //css 선택자로 도서제목을 담도서재목 추출
    let elements =dom('.book_tit');

    //찾은요소를 순회하면서 요소의 텍스트 출력
    elements.each((idx,title)=>{
       // console.log(dom(title).text());//글자만 긁어오기
        titles.push(dom(title).text());//배열에 추가
    });

    //css 선틱자로 저자 담고 있는 요소 지정//****
    elements =dom('.book_writer');

    elements.each((idx,writer)=>{
        //console.log(dom(writer).text()); //글자만 긁어오기
        writers.push(dom(writer).text());
    });


    //css 선틱자로 가격 담고 있는 요소 지정
    elements =dom('.price');

    elements.each((idx,price)=>{
       // console.log(dom(price).text()); //글자만 긁어오기
        prices.push(dom(price).text());
    });

    //저장된 배열 요소 갯수 확인
    console.log(titles.length,writers.length,prices.length);
    //수집한 정보들을 json객체로 생성
    for (let i=0;i<titles.length;++i){
        let book ={};
        book.title=titles[i];
        book.writer=writers[i].replace(/ /g,'');
        book.price=prices[i].replace(/[,|원]/g,'');
        books.push(book);

    }
    //생성된 도서 객체 확인
    console.log(books);

    //생성된 도서 객체를 제이슨문자열로 변환하고
    const bookJSON=JSON.stringify(books)

        //data라는 폴더 가 있는지 확인 없으면 생성
    !fs.existsSync('data') && fs.mkdirSync('data');//디렉토리 생성 여부 확인

    //저장위치와 파일명 지정후 파일에 저장
    const fpath=path.join(__dirname,'data','books.json');//현재 디렉토리 경로에 data라는 디렉토리에books.json생성하는것
    fs.writeFileSync(fpath,bookJSON);
};
main();