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
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const accordion = header.parentElement;
    const body = accordion.querySelector('.accordion-body');

    if (accordion.classList.contains('active')) {
      accordion.classList.remove('active');
      body.style.maxHeight = "0px";
    } else {
      accordion.classList.add('active');
      body.style.maxHeight = "600px"; // กำหนดสูงสุดให้ scroll
    }
  });
});




// เลือกทุกปุ่ม
document.querySelectorAll('.bentone-cert').forEach(btn => {
  btn.addEventListener('click', () => {
    const popup = document.getElementById('popup');
    const img = popup.querySelector('img');
    img.src = btn.getAttribute('data-gif'); // เปลี่ยนภาพ
    popup.style.display = 'flex';
  });
});

// ปิด popup
document.querySelector('#popup .close').addEventListener('click', () => {
  document.getElementById('popup').style.display = 'none';
});

// คลิกนอกภาพก็ปิด
document.getElementById('popup').addEventListener('click', e => {
  if(e.target.id === 'popup') {
    e.target.style.display = 'none';
  }
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
  });
