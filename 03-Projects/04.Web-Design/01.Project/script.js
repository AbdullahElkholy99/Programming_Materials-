//   const slides = document.querySelectorAll(".quote-slide");
//   const next = document.querySelector(".next");
//   const prev = document.querySelector(".prev");

//   let index = 0;

//   function showSlide(i) {
//     slides.forEach(slide => slide.classList.remove("active"));
//     slides[i].classList.add("active");
//   }

//   next.onclick = () => {
//     index = (index + 1) % slides.length;
//     showSlide(index);
//   };

//   prev.onclick = () => {
//     index = (index - 1 + slides.length) % slides.length;
//     showSlide(index);
//   };





var quote1 = document.querySelector(".quote1");
var quote2 = document.querySelector(".quote2");

var ok = 1;

setInterval(function () {
  if (ok === 1) {
    console.log(ok);
    
    quote1.classList.toggle("hide");
    quote2.classList.toggle("show");
    ok = 0;
  } 
  else 
  {
      quote2.classList.toggle("show");
       quote1.classList.toggle("hide");
    ok = 1;
  }
}, 2000);


