document.addEventListener("DOMContentLoaded", function () {
  const topButton = document.getElementById("topBtn");

  topButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
  // TOP 버튼 클릭시 상단으로 부드럽게 이동

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      topButton.style.display = "block";
    } else {
      topButton.style.display = "none";
    }
  });
});

// 일정 스크롤 초과시, TOP 버튼의 display가 보여지는 기능
