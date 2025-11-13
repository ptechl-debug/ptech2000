
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".card").forEach(card => {
    const images = card.querySelectorAll(".carousel-images img");
    const prev = card.querySelector(".prev");
    const next = card.querySelector(".next");
    let currentIndex = 0;

    const showImage = index => {
      images.forEach((img, i) => {
        img.classList.toggle("active", i === index);
      });
    };

    next.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
    });

    prev.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage(currentIndex);
    });
  });
});

