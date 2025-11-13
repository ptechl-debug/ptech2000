document.addEventListener("DOMContentLoaded", () => {
  const mainContent = document.getElementById("main-content");

  // ✅ ฟังก์ชันโหลดหน้าใหม่แบบ SPA
  function loadPage(url, addToHistory = true) {
    // ใส่ fade out เฉพาะ mainContent
    mainContent.classList.add("fade-out");

    fetch(url)
      .then(res => res.text())
      .then(html => {
        // แทนที่ content
        mainContent.innerHTML = html;

        // หลัง insert, ลบ fade out เพื่อ fade in
        requestAnimationFrame(() => {
          mainContent.classList.remove("fade-out");
        });

        // bind ลิงก์ใหม่หลัง inject
        bindLinks();
        initNavbar(); // เรียกฟังก์ชัน initNavbar ของ navbar.js

        // push history
        if (addToHistory) {
          history.pushState({ url }, "", url);
        }
      })
      .catch(err => console.error("โหลดหน้าไม่สำเร็จ:", err));
  }

  // ✅ bind ลิงก์ SPA-style
  function bindLinks() {
    document.querySelectorAll('a').forEach(link => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('#') && !href.startsWith('http')) {
        link.onclick = e => {
          e.preventDefault();
          loadPage(href);
        };
      }
    });
  }

  bindLinks(); // bind ลิงก์ครั้งแรก

  // ✅ รองรับ back/forward button
  window.addEventListener("popstate", e => {
    if (e.state?.url) {
      loadPage(e.state.url, false); // false = ไม่ push state ซ้ำ
    }
  });
});
