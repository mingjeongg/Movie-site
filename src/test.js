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


const generateMovieCards = async () => {
    const movies = await fetchMovieData();
  
  // 부모인 container에 클릭 이벤트 헨들러 심어놓기 위함
  const container = document.querySelector(".container"); 

    container.innerHTML = movies.map((results) => 
      `  <div class="movieItem" id="${results.id}">
          <img src="https://image.tmdb.org/t/p/w500${results.poster_path}" alt="">
            <h3 id="h3">${results.title}</h3>
            <p>${results.overview}</p>
            <p>평점 : ${results.vote_average}</p>
        </div>
      `
        )
    .join("");
}

generateMovieCards();



// 평점 순 슬라이드 생성
const generateTopRatedSlide = async () => {
  const movies = await fetchMovieData();

// 부모인 container에 클릭 이벤트 헨들러 심어놓기 위함
const slides = document.querySelector(".slides"); 

slides.innerHTML = movies.map((results) => 
    `  <li><img src="https://image.tmdb.org/t/p/w500${results.poster_path}" alt=""></li>`
      ).join("");

console.log("====");


      const slide = document.querySelectorAll('.slides li');
      console.log("slide", slide);
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


