fetch("navbar.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("navbar").innerHTML = data;

    // ไฮไลต์ menu
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

    // observer สำหรับ page-title
    const targets = document.querySelectorAll(".page-title");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add("active");
          observer.unobserve(entry.target); // remove observer หลัง animate
        }
      });
    }, { threshold: 0.6 });
    targets.forEach(el => observer.observe(el));
  });

// fetch contact หลัง DOM พร้อม
fetch("contact.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("contact-section").innerHTML = data;

    // bind accordion หลัง content ถูก fetch
    document.querySelectorAll('.accordion').forEach(item => {
      item.addEventListener('click', () => {
        item.classList.toggle('active');
      });
    });
  });
