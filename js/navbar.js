console.log("ก่อน fetch navbar");
fetch("navbar.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("navbar").innerHTML = data;
    const navbar = document.querySelector(".my-navbar");
    const topBar = document.querySelector(".top-bar");
    const hamburger = navbar.querySelector(".hamburger");
    const navMenu = navbar.querySelector("ul");

    // ✅ เปิด/ปิดเมนูมือถือ
    if (hamburger && navMenu) {
      hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("open");
      });
    }

    // ✅ ปิดเมนูเมื่อคลิกลิงก์
    navMenu?.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
      });
    });

    // ✅ scroll effect ทำงานเฉพาะ desktop
    function handleScrollEffect() {
      if (window.innerWidth <= 768) return; // ปิดบนมือถือ
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
        topBar.classList.add("hidden");
      } else {
        navbar.classList.remove("scrolled");
        topBar.classList.remove("hidden");
      }
    }
    window.addEventListener("scroll", handleScrollEffect);

    // ✅ active menu
    const current = window.location.pathname.split("/").pop();
    const menuItems = navbar.querySelectorAll("ul li a");
    menuItems.forEach(item => {
      if (item.getAttribute("href") === current) {
        item.classList.add("active");
        const parent = item.closest(".dropdown");
        if (parent) parent.querySelector("a").classList.add("active");
      }
    });
  })
  .catch(err => console.error("โหลด navbar ไม่ได้:", err));
