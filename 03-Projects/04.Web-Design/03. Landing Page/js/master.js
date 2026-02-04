// settings-box : 
document.querySelector(".toggle-settings i").onclick = function(){

  // Toggle class fa-spin fir rotation on self
  this.classList.toggle("fa-spin");

  //
  document.querySelector(".settings-box").classList.toggle("open");
};

//---------------- Switch Colors
const colorslist = document.querySelectorAll(".colors-list li");

colorslist.forEach(li => {

  //click on every list e
  li.addEventListener("click" , (e) =>{
    console.log(e.target.dataset.color);

    //set color on Root : 
    document.documentElement.style.setProperty('--main-color',e.target.dataset.color)
  })

})



//Select landing Page element
let landingPage = document.querySelector(".landing-page");

//get array of images :
let imgArray = [
  "bg-image1.png",
  "bg-image2.png",
  "bg-image3.png",
  "bg-image4.png",
  "bg-image5.png",
];

setInterval(() => {
  // Get Random number
  let randomIndx = Math.floor(Math.random() * imgArray.length);
  //change background image url :
  landingPage.style.backgroundImage = `url("../images/${imgArray[randomIndx]}")`;
}, 9000);
