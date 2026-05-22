const products = [
  { id: 1, name: "Guitarra Fender", price: 1200, category: "guitarras", image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d" },
  { id: 2, name: "Guitarra Acústica", price: 800, category: "guitarras", image: "guitarra.jpeg" },
  { id: 3, name: "Teclado Yamaha", price: 1500, category: "teclados", image: "https://images.unsplash.com/photo-1513785077080-84c5b4e0c1d6" },
  { id: 4, name: "Piano Digital", price: 2000, category: "teclados", image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0" },
  { id: 5, name: "Batería", price: 2500, category: "percusion", image: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7" },
  { id: 6, name: "Congas", price: 600, category: "percusion", image: "https://images.unsplash.com/photo-1612225330812-01a9c6b355a3" },
  { id: 7, name: "Saxofón", price: 1800, category: "viento", image: "saxofono-alto-yamaha.jpg" },
  { id: 8, name: "trompeta", price: 1000000, category:"viento",image:"TrompetaConductor_1024x.webp" }
];

let cart = [];
let currentCategory = "all";

const productList = document.getElementById("productList");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const total = document.getElementById("total");
const searchInput = document.getElementById("searchInput");

// 📦 PRODUCTOS
function renderProducts(list) {
  productList.innerHTML = "";

  list.forEach(p => {
    productList.innerHTML += `
      <div class="bg-gray-900 border border-red-900 rounded-lg overflow-hidden hover:scale-105 transition flex flex-col">

        <img src="${p.image}" class="h-40 w-full object-cover"/>

        <div class="p-2 flex flex-col flex-1">

          <h3 class="font-bold text-sm">${p.name}</h3>
          <p class="text-xs text-gray-400">${p.category}</p>

          <p class="text-red-400 font-bold mt-auto">$${p.price}</p>

          <button onclick="addToCart(${p.id})"
            class="mt-2 bg-red-800 hover:bg-red-600 py-1 rounded text-sm">
            Agregar
          </button>

        </div>

      </div>
    `;
  });
}

// ➕ CARRITO
function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  updateCart();
}

// ❌ ELIMINAR
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// 🛒 ACTUALIZAR
function updateCart() {
  cartItems.innerHTML = "";
  let sum = 0;

  cart.forEach((item, i) => {
    sum += item.price;

    cartItems.innerHTML += `
      <div class="flex justify-between border-b border-red-900 py-2 text-sm">
        <span>${item.name}</span>
        <button onclick="removeFromCart(${i})" class="text-red-500">X</button>
      </div>
    `;
  });

  cartCount.innerText = cart.length;
  total.innerText = sum;
}

// 🔎 BUSCAR + FILTRO
function updateView() {
  let value = searchInput.value.toLowerCase();

  let filtered = products.filter(p =>
    p.name.toLowerCase().includes(value)
  );

  if (currentCategory !== "all") {
    filtered = filtered.filter(p => p.category === currentCategory);
  }

  renderProducts(filtered);
}

searchInput.addEventListener("input", updateView);

// 🏷️ FILTROS
function filterCategory(cat) {
  currentCategory = cat;
  updateView();
}

// 🛒 CARRO DESLIZABLE
function toggleCart() {
  const cart = document.getElementById("cart");

  if (cart.classList.contains("translate-x-full")) {
    cart.classList.remove("translate-x-full");
  } else {
    cart.classList.add("translate-x-full");
  }
}

// INIT
renderProducts(products);
     