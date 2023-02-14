//hanb.co.kr사이트에서 새로나온책에 대한 정보를 긁어오기
//https://www.hanbit.co.kr/store/books/new_book_list.html
//https://www.hanbit.co.kr/store/books/new_book_list.html
//사용할 패키지 가져오기:require()
//수집한 데이터들을 newbook라는 테이블에 저장해둠


//create table newbooks (
//bookno number(6),
// title varchar(250) not null ,
// writer varchar(100) not null ,
// price number not null ,
//  regdate date default sysdate ,
// primary key (bookno)
//);
//create sequence bkno; 순번생성기
//create sequence bkno; 순번생성기

const axios = require('axios'); //
const cheerio = require('cheerio');
const mariadb = require('mariadb');
const dbconfig = require('./dbconfig2.js');

async function main() {
    //지정한 사이트로부터 도서제목,저자,가격을 추출해서
    //json객체로 저장






    const URl='https://www.hanbit.co.kr/store/books/new_book_list.html';
    const headers={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.78'}

    //수집할 개별 정보를 저장하기 위해 배열 선언-전개 spread syntax구문
    let [titles,writers,prices,books]=[[],[],[],[]];


    const html=await axios.get(URl,{
        headers:headers
    });


    const dom = cheerio.load(html.data);//데이터불러오부분 여기까지



    let elements =dom('.book_tit');


    elements.each((idx,title)=>{

        titles.push(dom(title).text());//배열에 추가
    });


    elements =dom('.book_writer');

    elements.each((idx,writer)=>{

        writers.push(dom(writer).text());
    });



    elements =dom('.price');

    elements.each((idx,price)=>{

        prices.push(dom(price).text());
    });




    for (let i=0;i<titles.length;++i){
        let book ={};
        book.title=titles[i];
        book.writer=writers[i].replace(/ /g,'');
        book.price=prices[i].replace(/[,|원]/g,'');
        books.push(book);

    }

    //저장한json객체로부터 도서제목,저자,가격을 추출해서
    //마리아디비 테이블에 저장
    let conn = null;
    let sql =' insert into newbooks (title,writer,price) values (?, ?, ?) ';
    let params = [];

    try {

        conn = await mariadb.createConnection(dbconfig);

        for(let bk of books) {
        params =[bk.title, bk.writer, bk.price];
        let result =await conn.execute(sql,params);
        await conn.commit();
        console.log(result);
        }




    } catch(ex) {
        console.error(ex);
    } finally {
        if (conn) {

        }
    }


};
main();