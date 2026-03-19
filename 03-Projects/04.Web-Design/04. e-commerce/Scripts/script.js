// load data and

let currentPage = 1;
const limit = 8;
let totalPages = 1;

async function loadProducts(page = 1) {
    const cards = document.querySelector(".product-cards");
    cards.classList.add("loading");
    const skip = (currentPage - 1) * limit;
    const response = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`,
    );

    if (!response.ok) {
        showToast("Error When Fetching Data");
        return;
    }
    showToast("Success When Fetch data", "success");

    const data = await response.json();

    const products = data.products;

    totalPages = Math.ceil(data.total / limit);

    let html = "";
    products.map((p) => {
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

function changePage(page) {
    if (page < 1 || page > totalPages) return;

    currentPage = page;

    loadProducts(currentPage);
}
function showSkeleton(card = ".cards") {
    const cards = document.querySelector(card);

    let skeleton = "";

    for (let i = 0; i < 8; i++) {
        skeleton += `<div class="card-skeleton skeleton"></div>`;
    }

    cards.innerHTML = skeleton;
}

loadProducts(currentPage);

//------------------------ top seiling
async function loadProductsTopSelling() {
    const cards = document.querySelector(".topselling-cards");
    if(cards)
    cards.classList.add("loading");

    const response = await fetch(`https://dummyjson.com/products`);

    if (!response.ok) {
        showToast("Error When Fetching Data");
        return;
    }
    showToast("Success When Fetch data", "success");

    const data = await response.json();

    const products = data.products.filter((p) => p.rating > 4.5).slice(0, 8);

    let html = "";
    products.map((p) => {
        const imageUrl = p.images.length
            ? p.images[0]
            : `https://dummyjson.com/image/400x400`;

        const originalPrice = (p.price / (1 - p.discountPercentage / 100)).toFixed(2);

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

            <button class="cart" onclick="quickAdd(${p.id})">
                <i class="fa-solid fa-cart-shopping"></i>
            </button>

            </div>

            </div>
            </div>`;
    });
    if(cards)
    {
        cards.innerHTML = html;
        cards.classList.remove("loading");
    }
    return data;
}

let AllProducts = [];

async function init() {
     const data = await loadProductsTopSelling();

    AllProducts = data || []; 
    // notify other file script
    document.dispatchEvent(new Event("productsLoaded"));

}
init();
//----------------------- toast message
function showToast(message, type = "success", duration = 3000) {
    const container = document.getElementById("toast-container");

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;

    let icon = "";

    if (type === "success") icon = "fa-circle-check";
    if (type === "error") icon = "fa-circle-xmark";
    if (type === "warning") icon = "fa-triangle-exclamation";

    toast.innerHTML = `
        <i class="fa-solid ${icon}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = "slideOut .4s forwards";
        setTimeout(() => toast.remove(), 400);
    }, duration);
}

//----------------------- reviews :
let customerReviews = [
    {
        name: "Sarah Johnson",
        rating: 5,
        description:
            "Amazing service and very high quality products. I will definitely buy again!",
    },
    {
        name: "Michael Brown",
        rating: 4,
        description:
            "The product arrived quickly and the quality exceeded my expectations.",
    },
    {
        name: "Emily Davis",
        rating: 5,
        description:
            "Customer support was fantastic and helped me with all my questions.",
    },
    {
        name: "James Wilson",
        rating: 4,
        description:
            "Great experience overall. Shipping was fast and packaging was perfect.",
    },
    {
        name: "Olivia Martinez",
        rating: 5,
        description:
            "I absolutely love this store. Everything looks exactly like the photos.",
    },
    {
        name: "Daniel Anderson",
        rating: 4,
        description: "Very good quality and fair prices. I recommend this shop.",
    },
    {
        name: "Sophia Taylor",
        rating: 5,
        description: "One of the best online shopping experiences I have had.",
    },
    {
        name: "William Thomas",
        rating: 4,
        description: "Good service and smooth ordering process. Will order again.",
    },
    {
        name: "Isabella Moore",
        rating: 5,
        description: "Excellent products and amazing customer service!",
    },
];

const reviewCards = document.getElementById("review-cards");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

let position = 0;
let cardWidth = 305;
const visibleCards = 3;
const maxScroll = (customerReviews.length - visibleCards) * cardWidth;

function loadCustomerReviews() {
    let html = "";

    customerReviews.forEach((review) => {
        let stars = "";
        for (let i = 0; i < review.rating; i++) {
            stars += `<i class="fa-solid fa-star"></i>`;
        }

        html += `
        <div class="review-card">
            <h5 class="review-stars">
                ${stars}
            </h5>

            <h3 class="review-name">${review.name}</h3>

            <span class="review-description">
            ${review.description}
            </span>
        </div>
        `;
    });
    if(reviewCards)
        reviewCards.innerHTML = html;
}

loadCustomerReviews();

if(next)
next.addEventListener("click", () => {
    if (position < maxScroll) {
        position += cardWidth;
        reviewCards.style.transform = `translateX(-${position}px)`;
    }
});
if(prev)

prev.addEventListener("click", () => {
    if (position > 0) {
        position -= cardWidth;
        reviewCards.style.transform = `translateX(-${position}px)`;
    }
});

//----------------------- cart :
const openCartBtn = document.getElementById("openCart");
const cartDiv = document.getElementById("cart");
const overlay = document.getElementById("overlay");
const closeCart = document.querySelector(".cart-header i ");
const orderItems = document.querySelector(".order-items ");
const orderSummery = document.querySelector(".order-summery ");
const NoItems = document.getElementById("NoItems");

let noItems = 0;
let cartProducts = []

//openCartBtn
openCartBtn.addEventListener("click", () => {
    cartDiv.classList.toggle("show");
    overlay.classList.toggle("show");

});
//closeCart
closeCart.addEventListener("click", () => {
    cart.classList.remove("show");
    overlay.classList.remove("show");
});
//overlay
overlay.addEventListener("click", () => {
    cart.classList.remove("show");
    overlay.classList.remove("show");
});

// function to quick add
function quickAdd(id) {

    const item = AllProducts.products.find((i) => i.id === id)

    // check if already in cart
    const existingItem = cartProducts.find((i) => i.id === id);

    if (existingItem) {
        updateQuantityItemCart(id);
    } else {
        const newItem = { ...item, quantity: 1 };
        cartProducts.push(newItem);
        addToCart(newItem);
        NoItems.innerText = ++noItems;
    }

    saveCart();

}
// function to add item in cart 
function addToCart(item) {
    const imageUrl = item.images.length
        ? item.images[0]
        : `https://dummyjson.com/image/400x400`;

    const originalPrice = (item.price / (1 - item.discountPercentage / 100)).toFixed(2);

    const html = `
     <div class="order-item" id="item-${item.id}">
            <div class="item-image">
              <img src="${imageUrl}" alt="" />
                <span class="item-badge">-${Math.round(item.discountPercentage)}%</span>
            </div>

            <div class="item-info">
               <div class="item-header">
                <span>${item.title}</span>
                <i class="fa-solid fa-trash" onclick="removeItem(${item.id})"></i>
              </div>

              <div class="item-content">
                <div class="price"><span>Price:</span> 
                 <span class="originalPrice">${originalPrice}</span></div>
                <div class="rating">
                  <span>Rating:</span>${item.rating}
                </div>
              </div>

              <div class="item-footer">
                <div class="item-price">$${item.price}</div>
                <div class="item-quantity">
                  <i class="fa-solid fa-minus" onclick="decreaseQty(${item.id})"></i>
                  <span id="quantity-${item.id}">1</span>
                  <i class="fa-solid fa-plus" onclick="increaseQty(${item.id})"></i>
                </div>
              </div>
            </div>
          </div>
    `

    orderItems.innerHTML += html;

    const sub_total = document.querySelector(".sub-total .total-value") 
    const discount = document.querySelector(".discount .discount-value") 
    const fee = document.querySelector(".delivery-fee .fee") 

    
}
// function updateQuantityItemCart
function updateQuantityItemCart(id) {
    const quantityEl = document.getElementById(`quantity-${id}`);
    let currentQty = parseInt(quantityEl.innerText);

    const existingItem = cartProducts.find((i) => i.id === id);

    if (existingItem.stock > currentQty) {
        currentQty++;

        //update ui
        quantityEl.innerText = currentQty;

        //update data
        existingItem.quantity = currentQty;

    }
    else {
        showToast("Can not add more this item", "warning")
    }
    saveCart();

}
// function  increaseQty
function increaseQty(id) {
    updateQuantityItemCart(id);

    saveCart();
}
// function decreaseQty
function decreaseQty(id) {
    const quantityEl = document.getElementById(`quantity-${id}`);
    let currentQty = parseInt(quantityEl.innerText);
    const existingItem = cartProducts.find((i) => i.id === id);

    if (currentQty > 1) {
        currentQty--;
        //update ui
        quantityEl.innerText = currentQty;

        //update data
        existingItem.quantity = currentQty;

    }

    saveCart();
}
// function removeItem
function removeItem(id) {
    const item = document.getElementById(`item-${id}`);
    item.remove();

    cartProducts = cartProducts.filter((i) => i.id !== id);
    noItems--;
    NoItems.innerText = noItems;
    saveCart();
}

// function updateCartSummary
function updateCartSummary() {
    const sub_total = document.querySelector(".sub-total .sub-total-value");
    const discountEl = document.querySelector(".discount .discount-value");
    const feeEl = document.querySelector(".delivery-fee .fee");
    const totalEl = document.querySelector(".total .total-value");

    let subTotal = 0;
    let discount = 0;
    let fee = 15; 

    cartProducts.forEach((p) => {
        subTotal += p.price * p.quantity;
        if (p.discountPercentage) {
            discount += (p.price * p.discountPercentage / 100) * p.quantity;
        }
    });

    let total = subTotal - discount + fee;

    // update UI
    if (sub_total) sub_total.textContent = `$${subTotal.toFixed(2)}`;
    if (discountEl) discountEl.textContent = `-$${discount.toFixed(2)}`;
    if (feeEl) feeEl.textContent = `$${fee}`;
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
}

// save products cart in local storage 
const CART_KEY = "cartProducts";

//function save cart 
function saveCart() {
    
    localStorage.setItem(CART_KEY, JSON.stringify(cartProducts));
     updateCartSummary();
}

//function load cart
function loadCart() {
    const data = localStorage.getItem(CART_KEY);

    if (data) {
        cartProducts = JSON.parse(data);

        cartProducts.forEach(item => {
            addToCart(item);

            // update number of items
            const quantityEl = document.getElementById(`quantity-${item.id}`);
            if (quantityEl) {
                quantityEl.innerText = item.quantity;
            }
        });

        noItems = cartProducts.length;
        NoItems.innerText = noItems;
         updateCartSummary();
    }
}

// load function loadCart when page is open
window.addEventListener("DOMContentLoaded", loadCart);

//********************************************************** */

 function goToDetails(id)
{
  window.location.href = `../HTML/Casual-Details.html?id=${id}`;
}