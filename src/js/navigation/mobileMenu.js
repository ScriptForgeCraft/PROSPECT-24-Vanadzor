document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger-btn");
  const menu = document.querySelector(".mobile-menu");

  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    menu.classList.toggle("open");
    document.body.classList.toggle("no-scroll");
  });

  menu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      burger.classList.remove("active");
      menu.classList.remove("open");
      document.body.classList.remove("no-scroll");
    });
  });

  
});
