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


  


  fetch("contact.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("contact-section").innerHTML = data;
  });