"use strict";

let content = document.querySelector('#content');
let cards = document.querySelector('.cards');
let headCat = document.querySelector('#head-cat');

let categoryList = document.querySelectorAll('.category-sub');
let currentCategory = "";
let headCatText = "";
for(let li of categoryList){
    li.addEventListener('click', function(){
        currentCategory = li.dataset.category;
        headCatText = li.textContent;
        getProductsByCategory(currentCategory);
    }
)};

function showProduct(data){
    let allProducts = data.products;
    headCat.textContent = headCatText;
    let productList = "";
    for (const product of allProducts) {
        productList += `
        <div class="product-card">
            <img src="${product["images"][0]}" alt="" class="img-product">
            <p class="title-product">${product.title}</p>
            <p class="price-product">${product.price} $</p>
            <p class="desc-product">${product.description}</p>
        </div>`;
    }
    cards.innerHTML = productList;
}

function getProductsByCategory(category){
    fetch('https://dummyjson.com/products/category/' + category)
    .then(res => res.json())
    .then(data => showProduct(data));
}