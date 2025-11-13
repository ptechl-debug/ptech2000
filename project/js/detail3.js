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
  const images = document.querySelectorAll('.carousel-images img');
  let currentIndex = 0;

  const showImage = index => {
    images.forEach((img, i) => {
      img.classList.toggle('active', i === index);
    });
  }

  document.querySelector('.next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  });

  document.querySelector('.prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  });
});




fetch("contact.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("contact-section").innerHTML = data;

    // --- เลือกวิดีโอที่โหลดเข้ามาใหม่ ---
    const videos = document.querySelectorAll("#contact-section video");

    videos.forEach(video => {
      video.muted = true;      // ต้อง muted ถ้า autoplay
      video.playsInline = true; // ให้เล่นบนมือถือ inline
      video.loop = true;

      // เรียก play
      video.play().catch(err => {
        console.log("Video play failed:", err);
      });
    });
  });

