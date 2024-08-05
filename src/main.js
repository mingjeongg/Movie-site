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

const container = document.querySelector(".container");
const slides = document.querySelector(".slides"); // ul 태그
let originResults;

// ====영화카드 생성====
const generateMovieCards = async () => {
  const movies = await fetchMovieData();

  // 슬라이드 생성
  createSlide(movies);

  originResults = movies;

  container.innerHTML = movies
    .map(
      (results) =>
        `  <div class="movieItem" id="${results.id}">
        <img src="https://image.tmdb.org/t/p/w500${results.poster_path}" alt="">
          <h3 id="h3" style ="display:none">${results.title}</h3>
      </div>
    `
    )
    .join("");
};

generateMovieCards();

// ====슬라이드 생성 함수====
function createSlide(resultList) {
  slides.innerHTML = resultList
    .map(
      (results) =>
        ` <li><img src="https://image.tmdb.org/t/p/w500${results.poster_path}" id="${results.id}" class="movieImg"></li>`
    )
    .join("");

  const slide = document.querySelectorAll(".slides li");
  let currentIdx = 0;
  console.log("currentIdx", currentIdx);
  let slideCount = slide.length;
  let slideWidth = 300;
  let slideMargin = 30;
  let prevBtn = document.querySelector(".prev");
  let nextBtn = document.querySelector(".next");

  slides.style.width =
    (slideWidth + slideMargin) * slideCount - slideMargin + "px";

  function moveSlide(num) {
    slides.style.left = -num * 330 + "px";
    currentIdx = num;
  }

  nextBtn.addEventListener("click", function () {
    if (currentIdx < slideCount - 3) {
      moveSlide(currentIdx + 1);
      console.log("> 버튼 클릭 시 ", currentIdx);
    } else {
      moveSlide(0);
    }
  });

  prevBtn.addEventListener("click", function () {
    if (currentIdx > 0) {
      moveSlide(currentIdx - 1);
      console.log("< 버튼 클릭 시 ", currentIdx);
    } else {
      moveSlide(slideCount - 3);
    }
  });
}

// ==== 상세 페이지로 이동 =====
container.addEventListener("click", handleClickCard);
function handleClickCard(e) {
  if (e.target === container) return; //카드말고 그 외 영역(container) 클릭했을때

  if (e.target.matches(".movieItem")) {
    // div클릭시
    window.location.href = `detail.html?id=${e.target.id}`;
  } else {
    // div 안에 이미지, h태그 등 클릭 시
    window.location.href = `detail.html?id=${e.target.parentNode.id}`;
  }
}

// 슬라이드 메인 -> 상세
slides.addEventListener("click", handleClickSlideCard);
function handleClickSlideCard(e) {
  if (e.target === slides) return;

  if (e.target.matches(".movieImg")) {
    window.location.href = `detail.html?id=${e.target.id}`;
  } else {
    window.location.href = `detail.html?id=${e.target.parentNode.id}`;
  }
}

// === 마우스 클릭 ===
document.getElementById("movieBtn").addEventListener("click", (e) => {
  e.preventDefault();
  console.log("클릭");
  search();
});

// === 엔터키 클릭 ===
window.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    search();
  }
});
// 검색 버튼 누르지 않아도 검색이 되는 기능
document.getElementById("movieInput").addEventListener("input", search);

//=== 검색 함수 ===
function search() {
  // input값 가져오기
  const inputValue = document.getElementById("movieInput");
  const valInput = inputValue.value;

  console.log("inputValue", inputValue);
  console.log("valInput", valInput);

  if (valInput === "") {
    alert("영화를 입력해주세요.");
  } else {
    // title 가져오기
    const titles = document.querySelectorAll("h3");
    // div영역 가져오기
    const items = document.querySelectorAll(".movieItem");

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
  <h3 id="h3" style ="display:none">${results.title}</h3>
</div>
`
    )
    .join("");

  //슬라이드 생성(인기순)
  createSlide(results);
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
  <h3 id="h3" style ="display:none">${results.title}</h3>
</div>
`
    )
    .join("");

  //슬라이드 생성(최신순)
  createSlide(results);
}
