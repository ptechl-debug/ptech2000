// footer.js
document.addEventListener("DOMContentLoaded", () => {
  const footer = document.getElementById("footer");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 150) { // เลื่อนลง 150px
      footer.classList.add("show");
    } else {
      footer.classList.remove("show");
    }
  });
});
