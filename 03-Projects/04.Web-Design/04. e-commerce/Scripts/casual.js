const rangeMin = document.getElementById("rangeMin");
const rangeMax = document.getElementById("rangeMax");
const minPrice = document.getElementById("minPrice");
const maxPrice = document.getElementById("maxPrice");
const track = document.querySelector(".slider-track");

function updateSlider() {
  let minVal = parseInt(rangeMin.value);
  let maxVal = parseInt(rangeMax.value);

  if (minVal > maxVal) {
    [minVal, maxVal] = [maxVal, minVal];
  }

  minPrice.textContent = `$${minVal}`;
  maxPrice.textContent = `$${maxVal}`;

  let percentMin = (minVal / rangeMin.max) * 100;
  let percentMax = (maxVal / rangeMax.max) * 100;

  track.style.background = `linear-gradient(
    to right,
    #e5e7eb ${percentMin}%,
    #000 ${percentMin}%,
    #000 ${percentMax}%,
    #e5e7eb ${percentMax}%
  )`;
}

rangeMin.addEventListener("input", updateSlider);
rangeMax.addEventListener("input", updateSlider);

updateSlider();



// // ---------------------- filter-header
const headers = document.querySelectorAll(".filter-header");

headers.forEach(header => {
  header.addEventListener("click", () => {
    const parent = header.parentElement;
    parent.classList.toggle("closed");
  });
});

// open filters in mobile mode

const filters = document.querySelector(".filters-section");
const btn = document.getElementById("openFilters");


btn.addEventListener("click", (e) => {
  e.stopPropagation();
  filters.classList.toggle("active");
});

filters.addEventListener("click", (e) => {
  e.stopPropagation();
});

document.addEventListener("click", () => {
  filters.classList.remove("active");
});

// // ----------------------- filter data 

let AllProducts = {
  original: [],
  filtered: []
};

let totalProducts = 0
let currentPage = 1;
const limit = 8;
let totalPages = 1;

async function init() {
  const response =
    await fetch(`https://dummyjson.com/products`);

  if (!response.ok) {
    showToast("Error loading data");
    return;
  }

  const data = await response.json();

  AllProducts = {
    original: data.products,
    filtered: data.products
  };
totalProducts = AllProducts.original.length
  runFilters();
}

init();
const pagination_info = document.querySelector(".pagination-info")
function renderProducts(products) {
  const cards = document.querySelector(".product-cards");

  //  step 1: fade out 
  const oldCards = cards.querySelectorAll(".card");
  oldCards.forEach(card => card.classList.add("exit"));

  setTimeout(() => {

    totalPages = Math.ceil(products.length / limit);

    const start = (currentPage - 1) * limit;
    const paginated = products.slice(start, start + limit);

    pagination_info.textContent = 
    `Showing Page ${currentPage} of ${totalPages} - ${limit} products`

    let html = "";
    paginated.map((p) => {
      const imageUrl = p.images.length
        ? p.images[0]
        : `https://dummyjson.com/image/400x400`;

      const originalPrice = (p.price / (1 - p.discountPercentage / 100)).toFixed(
        2,
      );

      html += `<div class="card">

            <div class="card-image">
                <img src="${imageUrl}" alt="product">
                <span class="badge">-${Math.round(p.discountPercentage)}%</span>
            </div>

            <div class="card-content">

            <h4 class="product-name">${p.title}</h4>

            <div class="review">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <span>${p.rating}/5</span>
            </div>

            <div class="details">

            <div class="price">
                <span class="final-price">${p.price}</span>
                <span class="original-price">$${originalPrice}</span>
            </div>
            <div class="card-buttons">

                <button class="cart" onclick="quickAdd(${p.id})">
                    <i class="fa-solid fa-cart-shopping" title="Add To Cart"></i>
                </button>
                <button class="cart" onclick="goToDetails(${p.id})">
                   <i class="fa-regular fa-eye" title="View Details"></i>
                
                </button>
            </div>
                
            </div>

            </div>

        </div>`;
    });


    cards.innerHTML = html;
    cards.classList.remove("loading");


    renderPagination();

  }, 300);

}

function runFilters() {
  if (!AllProducts?.original?.length) return;

  const allProducts = AllProducts.original;

  // category
  const filterTypes =
    document.querySelectorAll(".filter-types input");

  const selected = [...filterTypes]
    .filter(i => i.checked)
    .map(i => i.value.toLowerCase());

  //  price
  const minVal = parseInt(rangeMin.value);
  const maxVal = parseInt(rangeMax.value);

  console.log("minVal", minVal);
  console.log("maxVal", maxVal);

  const filtered =
    allProducts.filter(product => {

      const matchCategory =
        selected.length === 0 ||
        selected.some(f =>
          product.category.toLowerCase() === f
        );

      console.log("matchCategory", matchCategory);

      const matchPrice =
        product.price >= minVal
        && product.price <= maxVal;

      return matchCategory && matchPrice;
    });

  AllProducts.filtered = filtered;

  currentPage = 1; // reset page

  console.log("filtered ", filtered);

  renderProducts(filtered);
}


function renderPagination() {
  const container = document.getElementById("pagination");

  let html = "";

  html += `<button class="page-btn" onclick="changePage(${currentPage - 1})">Prev</button>`;

  let start = Math.max(1, currentPage - 2);
  let end = Math.min(totalPages, currentPage + 2);

  if (start > 1) {
    html += `<button class="page-btn" onclick="changePage(1)">1</button>`;
    if (start > 2) html += `<span>...</span>`;
  }

  for (let i = start; i <= end; i++) {
    html += `
        <button 
            class="page-btn ${i === currentPage ? "active" : ""}"
            onclick="changePage(${i})">
            ${i}
        </button>
        `;
  }

  if (end < totalPages) {
    if (end < totalPages - 1) html += `<span>...</span>`;
    html += `<button class="page-btn" onclick="changePage(${totalPages})">${totalPages}</button>`;
  }

  html += `<button class="page-btn" onclick="changePage(${currentPage + 1})">Next</button>`;

  container.innerHTML = html;
}


function showSkeleton(card = ".cards") {
  const cards = document.querySelector(card);

  let skeleton = "";

  for (let i = 0; i < 8; i++) {
    skeleton += `<div class="card-skeleton skeleton"></div>`;
  }

  cards.innerHTML = skeleton;
}

function changePage(page) {
  if (page < 1 || page > totalPages) return;

  currentPage = page;

  renderProducts(AllProducts.filtered);
}
// category
document.querySelectorAll(".filter-types input")
  .forEach(input => input.addEventListener("change", runFilters));

// price
rangeMin.addEventListener("input", runFilters);
rangeMax.addEventListener("input", runFilters);


function goToDetails(id)
{
  window.location.href = `../HTML/Casual-Details.html?id=${id}`;
}