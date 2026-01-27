const contents = document.querySelectorAll(".hero .hero__content");
const dots = document.querySelectorAll(".hero .number__content span");
console.log(contents.length);

let index = 0;

// initial state
contents[0].classList.add("acitve");
dots[0].classList.add("active");

setInterval(() => {
  // remove current
  contents[index].classList.remove("acitve");
  console.log(contents[index])
  dots[index].classList.remove("active");

  // next index
  index++;
  if (index === contents.length) index = 0;

  // add new
  contents[index].classList.add("acitve");
  dots[index].classList.add("active");
}, 3000);


// لو حابب تضغط على الدواير وتغيّر السلايد:
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    contents.forEach(c => c.classList.remove("show"));
    dots.forEach(d => d.classList.remove("active"));

    index = i;
    contents[index].classList.add("show");
    dots[index].classList.add("active");
  });
});


// const serviceCards = document.querySelectorAll('.services .service__cards .card');
// const servicesDots = document.querySelectorAll('.services .click__card span');

// serviceCards[0].classList.add('active');
// servicesDots[0].classList.add('active');


// serviceCards.forEach((card, index) => {
//     card.addEventListener('click', () => {

//         // remove active from all cards
//         serviceCards.forEach(c => c.classList.remove('active'));
//         servicesDots.forEach(d => d.classList.remove('active'));

//         // add active to clicked card
//         card.classList.add('active');

//         // add active to corresponding span
//         servicesDots[index].classList.add('active');
//     });
// });
