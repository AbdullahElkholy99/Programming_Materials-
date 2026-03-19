const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const product_details = document.querySelector(".product-details");

async function init() {
  try {
    const response = await fetch(`https://dummyjson.com/products/${productId}`);

    if (!response.ok) {
      console.error("Error loading data");
      return;
    }

    const product = await response.json();

    console.log(product);
    
    renderProduct(product);
    renderReviews(product.reviews);

  } catch (error) {
    console.error("Error:", error);
  }
}

function renderProduct(product) {

  // images array
  let imagesHTML = "";
  product.images.forEach(image => {
    imagesHTML += `
      <div class="image">
        <img src="${image}" />
      </div>
    `;
  });

  //  main image 
  const mainImage = product.thumbnail || product.images[0];

  //  price
  const originalPrice = (
    product.price / (1 - product.discountPercentage / 100)
  ).toFixed(2);

  let html = `
    <div class="images-preview">
      ${imagesHTML}
    </div>

    <div class="main-image">
      <img src="${mainImage}" />
    </div>

    <div class="details">
      <div class="product-title">${product.title}</div>

      <div class="stars">
        ${renderStars(product.rating)}
        <span class="rating">(${product.rating})</span>
      </div>

      <div class="price">
        <span class="final-price">$${product.price}</span>
        <span class="original-price">$${originalPrice}</span>
        <span class="price-discount">-${Math.round(product.discountPercentage)}%</span>
      </div>

      <div class="description">${product.description}</div>

      <div class="divider"></div>

      <div class="content">
        ${renderColors()}
      </div>

      <div class="divider"></div>

      <div class="product-size">
        <button class="btn">Small</button>
        <button class="btn">Medium</button>
        <button class="btn">Large</button>
        <button class="btn">X-Large</button>
      </div>

      <div class="divider"></div>

      <div class="add-to-cart">
        <div class="quantity">
          <button class="qty-btn minus">-</button>
          <span class="qty-value">1</span>
          <button class="qty-btn plus">+</button>
        </div>

        <div class="addCart">
          <button class="btn">Add To Cart</button>
        </div>
      </div>
    </div>
  `;

  product_details.innerHTML = html;

  initEvents();
}

function renderStars(rating) {
  let stars = "";
  let full = Math.round(rating);

  for (let i = 1; i <= 5; i++) {
    stars += `<i class="star ${i <= full ? "active" : ""}">★</i>`;
  }

  return stars;
}

function renderColors() {
  return `
    <label class="color"><span style="background:#ef4444"></span></label>
    <label class="color"><span style="background:#1d4ed8"></span></label>
    <label class="color"><span class="white"></span></label>
    <label class="color"><span style="background:#000"></span></label>
  `;
}

const reviewCards= document.querySelector(".review-cards")
function renderReviews(reviews){

  // rating
  let html=``
document.getElementById("allReviews").textContent=`( ${reviews.length} )`

reviews.forEach(review => {
  
  let stars =``
for (let i = 0; i < review.rating; i++) {
  stars+= ` <i class="fa-regular fa-star"></i>`
}

html+=
  `
          <div class="review-card">
            <div class="review-card-header">
              <!-- card-stars -->
              <div class="card-stars">${stars}</div>

              <div class="card-dot"><i class="fa-solid fa-ellipsis"></i></div>
            </div>

            <div class="review-content">
              <div class="customer-name">${review.reviewerName}</div>

              <div class="review-text">
               ${review.comment}
              </div>

              <div class="review-date">Posted on ${review.date.todate}</div>
            </div>
        </div>`
      });
      
      reviewCards.innerHTML += html
}
function initEvents() {

  // colors
  const colors = document.querySelectorAll(".color");
  colors.forEach(c => {
    c.addEventListener("click", () => {
      colors.forEach(x => x.classList.remove("active"));
      c.classList.add("active");
    });
  });

  // quantity
  let qty = 1;
  const value = document.querySelector(".qty-value");

  document.querySelector(".plus").onclick = () => {
    qty++;
    value.textContent = qty;
  };

  document.querySelector(".minus").onclick = () => {
    if (qty > 1) qty--;
    value.textContent = qty;
  };

  // add to cart animation
  const addBtn = document.querySelector(".addCart .btn");

  addBtn.addEventListener("click", () => {
    addBtn.classList.add("clicked");
    addBtn.textContent = "Added ✔";

    setTimeout(() => {
      addBtn.classList.remove("clicked");
      addBtn.textContent = "Add To Cart";
    }, 1500);
  });

  // change main image
  document.querySelectorAll(".images-preview img").forEach(img => {
    img.addEventListener("click", () => {
      document.querySelector(".main-image img").src = img.src;
    });
  });






}

document.addEventListener("DOMContentLoaded", () => {
  init();
});