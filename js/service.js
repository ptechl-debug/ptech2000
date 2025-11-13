fetch("navbar.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("navbar").innerHTML = data;

    // --- รัน JS ไฮไลต์ active หลัง navbar โหลดเสร็จ ---
    const current = window.location.pathname.split("/").pop(); 
    const menuItems = document.querySelectorAll('.navbar ul li a');

    menuItems.forEach(item => {
      if(item.getAttribute('href') === current){
        item.classList.add('active');

        // ถ้าเป็น dropdown ให้ parent ไฮไลต์ด้วย
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

  fetch("contact.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("contact-section").innerHTML = data;
    });

  const images = [
    "../image/servicepttech.jpg",
    "../image/servicept2.jpg",
    "../image/servicept3.jpg",
    "../image/servicept4.jpg",
    "../image/servicept5.jpg",
    "../image/servicept6.jpg"
  ];

  let currentIndex = 0;
  const mainImage = document.getElementById("mainImage");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  let autoSlideInterval;

  function updateImage(index) {
    mainImage.style.opacity = 0;
    setTimeout(() => {
      mainImage.src = images[index];
      mainImage.style.opacity = 1;
    }, 300);
  }

  function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage(currentIndex);
  }

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage(currentIndex);
    resetAutoSlide();
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage(currentIndex);
    resetAutoSlide();
  });

  // คลิกที่รูปย่อยเปลี่ยนภาพหลักได้
  document.querySelectorAll(".bottom-row img").forEach((img, index) => {
    img.addEventListener("click", () => {
      currentIndex = index;
      updateImage(currentIndex);
      resetAutoSlide();
    });
  });

  // เริ่ม auto slide ทุก 4 วินาที
  function startAutoSlide() {
    autoSlideInterval = setInterval(showNextImage, 2000);
  }

  // รีเซ็ตการนับเวลาเมื่อมีการคลิกปุ่มหรือรูป
  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  // เริ่มทำงานทันทีเมื่อโหลด
  startAutoSlide();