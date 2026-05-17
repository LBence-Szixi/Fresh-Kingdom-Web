let categories;
let categoryBar = document.getElementById("categories");
let currentCategory = "";

let products;
let productGrid = document.getElementById("products");

fetch('https://fakestoreapi.com/products/categories')
  .then(response => response.json())
  .then(data => {
	console.log(data);
	categories = data;
	boltSetup();
	loadProducts();
  });

async function loadProducts()
{
	fetch('https://fakestoreapi.com/products/')
	.then(response => response.json())
	.then(data => {
		console.log(data);
		products = data;
		displayItems(currentCategory);
	});
}

function boltSetup()
{
	
	categories.forEach(category => {
		let categoryBtn = document.createElement("button");
		let capitalizedName = category.charAt(0).toUpperCase() + category.slice(1)
		categoryBtn.textContent = capitalizedName;
		categoryBtn.className = "category-btn";

		categoryBar.appendChild(categoryBtn);
	});

}

function displayItems(selectedCategory)
{
	products.forEach(product => {
		let productItem = document.createElement("div");
		productItem.className = "product";

		let productImg = document.createElement("img");
		productImg.src = product.image;
		productItem.appendChild(productImg);

		let productPrice = document.createElement("p");
		productPrice.className = "price";
		productPrice.textContent = (product.price + "€");
		productItem.appendChild(productPrice);

		let productName = document.createElement("span");
		productName.className = "popup";
		productName.textContent = product.title;
		productItem.appendChild(productName);

		productItem.onmouseover = function() {
			this.querySelector('.popup').classList.add("show");
		}
		productItem.onmouseout = function() {
			this.querySelector('.popup').classList.remove("show");
		}

		productGrid.appendChild(productItem);

	});
}