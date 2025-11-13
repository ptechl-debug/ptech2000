const hero = document.querySelector('.hero');

const heroImages = [
  "image/hero.png",
  "image/hero2.png",
  "image/hero3.png"
];

let currentIndex = 0;

// ฟังก์ชันเปลี่ยนภาพ
function setHeroImage(index) {
  currentIndex = index;
  hero.style.backgroundImage = `url('${heroImages[currentIndex]}')`;
}

// ปุ่ม next/prev
document.querySelector('.hero-next').addEventListener('click', () => {
  setHeroImage((currentIndex + 1) % heroImages.length);
});

document.querySelector('.hero-prev').addEventListener('click', () => {
  setHeroImage((currentIndex - 1 + heroImages.length) % heroImages.length);
});

// ตั้งค่าเริ่มต้น
setHeroImage(currentIndex);


const heroHeight = hero.offsetHeight;


            
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll('.carousel-images img'); 
  let currentIndex = 0;
  let intervalId;

  const showImage = index => {
    images.forEach((img, i) => {
      img.classList.toggle('active', i === index);
    });
  }

  // แสดงภาพเริ่มต้น
  showImage(currentIndex);

    function startAutoSlide() {
    intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
    }, 2500);
  }

  // ฟังก์ชันหยุด auto slide
  function stopAutoSlide() {
    clearInterval(intervalId);
  }
  function stopAutoSlide() {
    clearInterval(intervalId);
  }

  startAutoSlide();

  // next/prev
  document.querySelector('.next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
    resetAutoSlide(); // รีเซ็ต interval
  });

  document.querySelector('.prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
    resetAutoSlide(); // รีเซ็ต interval
  });


  // pause when hover
  images.forEach(img => {
    img.addEventListener('mouseenter', stopAutoSlide);
    img.addEventListener('mouseleave', startAutoSlide);
  });
});

window.scrollWithBounce = function(targetId) {
  const element = document.getElementById(targetId);
  if (!element) return;

  const targetPos = element.getBoundingClientRect().top + window.scrollY;

  // ถ้ามี navbar fixed
  const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;

  const overshoot = 20; // ปรับเด้งตามชอบ
  const finalPos = targetPos - navbarHeight - overshoot;

  let start = window.scrollY;
  let distance = finalPos - start;
  let startTime = null;
  const duration = 900;

  function easeOutBack(t) {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  }

  function animate(time) {
    if (!startTime) startTime = time;
    const elapsed = time - startTime;
    let progress = Math.min(elapsed / duration, 1);
    const eased = easeOutBack(progress);
    window.scrollTo(0, start + distance * eased);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      window.scrollTo(0, targetPos - navbarHeight);
    }
  }

  requestAnimationFrame(animate);
}

// เอาไฟล์ปัจจุบัน
const current = window.location.pathname.split("/").pop(); 
const menuItems = document.querySelectorAll('.navbar ul li a');

menuItems.forEach(item => {
  // ถ้า href ตรงกับไฟล์ปัจจุบัน
  if(item.getAttribute('href') === current){
    item.classList.add('active');
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const targets = document.querySelectorAll(
    ".right-links h1, .left_text_about h1, .product-title h1, .contact-header h1, .page-title"
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // เวลาเข้ามาใน viewport
        entry.target.classList.add("active");
      } else {
        // เวลาออกไปนอก viewport ลบออก
        entry.target.classList.remove("active");
      }
    });
  }, { threshold: 0.6 });

  targets.forEach(el => observer.observe(el));
});
fetch("contact.html")
  .then(res => res.text())
  .then(data => {
    const container = document.getElementById("contact-section");
    container.innerHTML = data;

    // bind event หลัง insert
    container.querySelectorAll(".card").forEach(card => {
      card.addEventListener("click", () => {
        scrollWithBounce("content"); // target ของคุณ
      });
    });
  });