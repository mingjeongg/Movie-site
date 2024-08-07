const progressBar = document.querySelector(".bar");

window.addEventListener("scroll", () =>{
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    // 전체 문서에서 얼마나 스크롤되었는지 계산
    const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;

    // 전체 문서에서 몇 %만큼 스크롤되었는지 계산해 progress bar의 width를 바꿔준다.
    const progressBar =  document.querySelector(".bar");
    progressBar.style.width = scrollPercentage + "%";
})
