fetch("navbar.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("navbar").innerHTML = data;

    // --- ไฮไลต์ menu ---
    const current = window.location.pathname.split("/").pop(); 
    const menuItems = document.querySelectorAll('.navbar ul li a');
    menuItems.forEach(item => {
      if(item.getAttribute('href') === current){
        item.classList.add('active');
        const parent = item.closest('.dropdown');
        if(parent){
          parent.querySelector('a').classList.add('active');
        }
      }
    });

    // --- รัน observer สำหรับ page-title ---
    const targets = document.querySelectorAll(".page-title ");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        } else {
          entry.target.classList.remove("active");
        }
      });
    }, { threshold: 0.6 });

    targets.forEach(el => observer.observe(el));
  });

  document.querySelectorAll('.accordion').forEach(item => {
  item.addEventListener('click', () => {
    item.classList.toggle('active');
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const slides = Array.from(track.children);
  let currentIndex = 0;

  const updateSlide = () => {
    const width = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${currentIndex * width}px)`;
  };

  document.querySelector(".next").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlide();
  });

  document.querySelector(".prev").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlide();
  });

  // จัดขนาดเริ่มต้นให้พอดีหน้าจอ
  window.addEventListener("resize", updateSlide);
});




  fetch("contact.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("contact-section").innerHTML = data;
  });