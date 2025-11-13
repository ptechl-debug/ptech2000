document.addEventListener("DOMContentLoaded", () => {

  const mainContent = document.getElementById("main-content");

  function loadPage(url, addToHistory = true) {
    // fade-out content
    mainContent.classList.add("fade-out");
    document.body.classList.add("fade-out");

    setTimeout(() => {
      fetch(url)
        .then(res => res.text())
        .then(html => {
          // ใส่ html ใหม่ลง div
          mainContent.innerHTML = html;

          // fade-in
          mainContent.classList.remove("fade-out");
          document.body.classList.remove("fade-out");

          // update URL โดยไม่โหลดหน้าใหม่
          if (addToHistory) {
            history.pushState({ url }, "", url);
          }

          // รีโหลดฟังก์ชัน JS ของ navbar หรือ script อื่น ๆ ถ้าต้อง
        })
        .catch(err => console.error("โหลดหน้าไม่สำเร็จ:", err));
    }, 400); // ต้องตรงกับ CSS transition
  }

  // คลิกลิงก์ทุกลิงก์ภายในเว็บ
  document.body.addEventListener("click", e => {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (href && !href.startsWith('#') && !href.startsWith('http')) {
      e.preventDefault();
      loadPage(href);
    }
  });

  // รองรับ back/forward button
  window.addEventListener("popstate", e => {
    if (e.state?.url) {
      loadPage(e.state.url, false);
    }
  });

});
