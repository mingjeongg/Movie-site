//fetch request
async function fetchMovieData() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMWM3NWQyZTlmNjY0YjA1NGRjYjY2OTBkN2IzYTFiYiIsIm5iZiI6MTcyMTczMzYwMC45MjI2NzgsInN1YiI6IjY2OWY5MDdlMTgxOWIxOWYzNjQ3Y2QyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yHUwz42hALvhTOCinYIe05Ety4uH2p5w--kbSnm8r9g",
      },
    };
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&include_adult=false",
      options
    );
    const data = await response.json();
    return data.results;
  }

// 부모인 container에 클릭 이벤트 헨들러 심어놓기 위함
const container = document.querySelector(".container"); 
// ul 태그
const slides = document.querySelector(".slides");



const generateMovieCards = async () => {
    const movies = await fetchMovieData();
    
    originResults = movies;

    container.innerHTML = movies.map((results) => 
      `  <div class="movieItem" id="${results.id}">
          <img src="https://image.tmdb.org/t/p/w500${results.poster_path}" alt="">
            <h3 id="h3" style ="display:none">${results.title}</h3>
        </div>
      `
        )
    .join("");
}
generateMovieCards();


  // 메인 -> 상세
  container.addEventListener("click", handleClickCard);
  function handleClickCard(e){
   if(e.target === container) return; //카드말고 그 외 영역(container) 클릭했을때 

   if(e.target.matches(".movieItem")){ // div클릭시
    window.location.href =`detail.html?id=${e.target.id}`;
   }else{ // div 안에 이미지, h태그 등 클릭 시 
    window.location.href =`detail.html?id=${e.target.parentNode.id}`;
  }
}




// 슬라이드 생성
const generateTopRatedSlide = async () => {
  const movies = await fetchMovieData();

slides.innerHTML = movies.map((results) => 
    `  <li><img src="https://image.tmdb.org/t/p/w500${results.poster_path}" alt=""></li>`
      ).join("");

      const slide = document.querySelectorAll('.slides li');
      currentIdx = 0;
      slideCount = slide.length;
      slideWidth = 300;
      slideMargin = 30;
      prevBtn = document.querySelector('.prev');
      nextBtn = document.querySelector('.next');
    
    slides.style.width =
      (slideWidth + slideMargin) * slideCount - slideMargin + 'px';
    
    function moveSlide(num) {
      slides.style.left = -num * 330 + 'px';
      currentIdx = num;
    }
    
    nextBtn.addEventListener('click', function () {
      if( currentIdx < slideCount - 3){
        moveSlide(currentIdx + 1);
      }else{
        moveSlide(0);
      }   
    });
    
    prevBtn.addEventListener('click', function () {
      if( currentIdx > 0){
        moveSlide(currentIdx - 1);
      }else{
        moveSlide(slideCount - 3);
      }   
    });

}
generateTopRatedSlide();


// === 마우스 클릭 ===
document.getElementById("movieBtn").addEventListener("click", (e) => {
  e.preventDefault();
  search();
});

// === 엔터키 클릭 ===
window.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    search();
  }
});

//=== 검색 함수 ===
function search() {
  
  // input값 가져오기
  const inputValue = document.getElementById("movieInput");
  const valInput = inputValue.value;

  if (valInput === "") {
    alert("영화를 입력해주세요.");
  } else {
    // title 가져오기
    const titles = document.querySelectorAll("h3");

    // div영역 가져오기
    const items = document.querySelectorAll(".movieItem");
    //console.log("itemDivs", items);

    titles.forEach((title, idx) => {
      const val = title.innerText;
      const valLow = val.toLocaleLowerCase();
      const valInputLow = valInput.toLocaleLowerCase();
      const isVisible = valLow.includes(valInputLow);

      if (isVisible) {
        items[idx].style.display = "block";
      } else {
        items[idx].style.display = "none";
      }
    });
  }
}



//인기순 정렬
document.querySelector("#label1").addEventListener("click", function () {
  sortPopularity(originResults);
});

function sortPopularity(results) {
  results.sort(function (a, b) {
    return b.popularity - a.popularity;
  });

  container.innerHTML = results
    .map(
      (results) =>
        `  <div class="movieItem" id="${results.id}">
    <img src="https://image.tmdb.org/t/p/w500${results.poster_path}" alt="">
  
  </div>
`
    )
    .join("");
}

// 최신순 정렬
document.querySelector("#label2").addEventListener("click", function () {
  sortNewest(originResults);
});

function sortNewest(results) {
  results.sort(function (a, b) {
    return new Date(b.release_date) - new Date(a.release_date);
  });

  container.innerHTML = results
    .map(
      (results) =>
        `  <div class="movieItem" id="${results.id}">
    <img src="https://image.tmdb.org/t/p/w500${results.poster_path}" alt="">

  </div>
`
    )
    .join("");
}