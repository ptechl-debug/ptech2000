document.addEventListener('DOMContentLoaded', () => {

  // ฟังก์ชันสำหรับสร้าง IntersectionObserver แบบ generic
  function createObserver(selector, threshold = 0.2) {
    const elements = document.querySelectorAll(selector);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.classList.add('visible');   // เข้ามา → show
        } else {
          entry.target.classList.remove('visible'); // ออก → reset
        }
      });
    }, { threshold: threshold });

    elements.forEach(el => observer.observe(el));
  }

  // เรียกใช้งานสำหรับแต่ละเอฟเฟกต์
  createObserver('.scroll-fade', 0.2);        // Fade-in
  createObserver('.scroll-slide-up', 0.2);    // Slide-up
  createObserver('.scroll-slide-left', 0.1);  // Slide-left
  createObserver('.scroll-slide-right', 0.1); // Slide-right

});
