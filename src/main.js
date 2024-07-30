//fetch request
const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMWM3NWQyZTlmNjY0YjA1NGRjYjY2OTBkN2IzYTFiYiIsIm5iZiI6MTcyMTczMzYwMC45MjI2NzgsInN1YiI6IjY2OWY5MDdlMTgxOWIxOWYzNjQ3Y2QyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yHUwz42hALvhTOCinYIe05Ety4uH2p5w--kbSnm8r9g",
    },
  };

fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((data) => {
    
    //console.log(data); //객체
    //{page: 1, results: Array(20), total_pages: 476, total_results: 9515}

    const { page, results, total_pages, total_results } = data;  //구조분해할당
    const container = document.querySelector(".container"); // <div class="container"></div> 아래에 붙이기 위함
    //console.log("container", container);
    
    results.forEach((item, idx) => {

      const { id, overview, poster_path, title, vote_average } = item; //구조분해할당
      const temp = document.createElement("div"); //<div id=></div> //forEach 바깥으로 적어줬었는데 No! => 한개만 적용됨

      //console.log("temp", temp);
      temp.className = 'movieItem';
      temp.innerHTML = `
          <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="">
          <h3 id="h3">${title}</h3>
          <p>${overview}</p>
          <p>평점 : ${vote_average}</p>
        `;

      //클릭 이벤트 시 id 알람창
      temp.addEventListener('click', () => alert(`Movie ID: ${id}`));
      container.appendChild(temp);
    });
  })
  .catch((err) => console.error(err));


    // 마우스 클릭
    document.getElementById("movieBtn").addEventListener("click", (e)=> {
      e.preventDefault();
      search();
      
    })

    // 엔터키 클릭
    window.addEventListener("keydown" ,(e) => {
      if(e.keyCode === 13){
        e.preventDefault();         
        search();
      }
    })


    //검색
    function search(){

      // input값 가져오기
      const inputValue = document.getElementById('movieInput');
      const valInput = inputValue.value;

      if(valInput === ''){
        alert("영화를 입력해주세요.");
      }else{
          // title 가져오기
          const titles = document.querySelectorAll("h3");

          // div영역 가져오기
          const items = document.querySelectorAll(".movieItem");
          //console.log("itemDivs", items);

          titles.forEach((title, idx)=>{
            
            const val = title.innerText;
            const valLow = val.toLocaleLowerCase();
            const valInputLow = valInput.toLocaleLowerCase();
            const isVisible = valLow.includes(valInputLow);

            if(isVisible){
              items[idx].style.display = 'block';
            }else{
              items[idx].style.display = 'none';
            }  
          })

      }
    }

    //스크롤 위치 표시
    