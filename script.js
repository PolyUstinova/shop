"use strict";

let categoryList = document.querySelectorAll('option');
for(let category of categoryList){
    category.addEventListener('change', function(){
        let selectedCategory = this.value;
        console.log(selectedCategory);
    });
}
console.log(categoryList);


fetch('https://dummyjson.com/products')
.then(res => res.json())
.then((json) => showProduct(json));

function showProduct(json){
    console.log(json)
    let content = document.querySelector('#content');
    let allProducts = json.products;
    for (const product of allProducts) {
        content.innerHTML += `
        <div>
            <img src="${product["images"][0]}" alt="">
            <p>${product.title}</p>
            <p>${product.description}</p>
            <p>${product.price}</p>
        </div>`;
    }
}



