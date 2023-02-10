//hanb.co.kr사이트에서 새로나온책에 대한 정보를 긁어오기
//https://www.hanbit.co.kr/store/books/new_book_list.html

//사용할 패키지 가져오기:require()
const axios=require('axios');

const main =()=>{

    //접속할 url지정
    const URl='https://www.hanbit.co.kr/store/books/new_book_list.html';
    //axios로 접속해서 html불러옴
     axios.get(URl)
         .then((html)=> {
             //불러온 html콘솔에 출력
             console.log(html.data);
         })
         .catch((error)=>{
             console.log(error);

         });


};
main();