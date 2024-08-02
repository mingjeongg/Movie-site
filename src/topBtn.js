document.addEventListener("DOMContentLoaded", function () {
  const topButton = document.getElementById("topBtn");

  topButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      topButton.style.display = "block";
    } else {
      topButton.style.display = "none";
    }
  });
});
