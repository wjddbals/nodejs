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


function getBookInfo() {
    return undefined;
}

async function main() {
  let books= getBookInfo();//

    saveBookInfo();//데이터파일에 저장한다 함수를 두개 를 넣어서 값을 전달
};
main();