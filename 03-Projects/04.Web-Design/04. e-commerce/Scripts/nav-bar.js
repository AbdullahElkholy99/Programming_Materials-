// ************* toggleBtn
const toggleBtn = document.querySelector(".toggle-bar");
const navLinks = document.querySelector(".nav-bar-links");
const dropdownToggle = document.querySelector(".dropdown-toggle");
const dropdownMenu = document.querySelector(".dropdown-menu");
const navLinksLi = document.querySelectorAll(".nav-bar-links li");

toggleBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
  toggleBtn.classList.toggle("active");
});

dropdownToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  dropdownMenu.classList.toggle("show");
});

document.addEventListener("click", () => {
  dropdownMenu.classList.remove("show");
});


navLinksLi.forEach((li) => {
  li.addEventListener("click", () => {

    // remove all active  
    navLinksLi.forEach((item) => {
      item.classList.remove("active");
    });

    // add active  to current element
    li.classList.add("active");
  });
});
// *************  closeBar
const closeBar = document.querySelector(".close-bar");
const topBar = document.querySelector(".top-nav-bar");

closeBar.addEventListener("click", () => {
    topBar.style.display = "none";
});


