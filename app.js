const products = [
  { id: 1, name: "Guitarra Fender", price: 1600000, category: "guitarras", image: "https://www.txirula.com/img/cms/Blog/electr%20principiantes/19985_1.jpg" },
  { id: 2, name: "Guitarra Acústica", price: 300000, category: "guitarras", image: "https://elsonido.net/2-large_default/comprar-guitarra-acustica-c40-yamaha-en-colombia.jpg" },
  { id: 3, name: "Teclado Yamaha", price: 150000, category: "teclados", image: "https://www.pianosbogota.com/wp-content/uploads/2022/09/TECLADO-YAMAHA-PSR-EW425-Bogota.jpg" },
  { id: 4, name: "Piano ", price: 6000000, category: "teclados", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8tq1_WcWCb9xZRQBTFb5ZSXFWi_yYvH_EdA&s" },
  { id: 5, name: "Batería", price: 4000000, category: "percusion", image: "https://www.musicanarias.com/12077-thickbox_default/bateria-yamaha-stage-custom-birch-sbp0f5-deep-blue-sb.jpg" },
  { id: 6, name: "Congas", price: 1450000, category: "percusion", image: "https://ortizo.com.co/cdn/shop/files/Productosnuevos_10_72e5739c-f76e-4c52-85d0-d4d835a20a10.jpg?v=1766601930&width=480" },
  { id: 7, name: "Saxofón", price: 3500000, category: "viento", image: "https://image.made-in-china.com/202f0j00HuGcpYrFYNzS/High-End-Professional-Grade-Alto-Saxophone-Brass-Instrument-Sax.webp" },
  { id: 8, name: "Trompeta", price: 1000000, category:"viento",image:"https://allmusic.com.co/cdn/shop/files/S652599b581fb44a3acd67579e790d112H_800x.webp?v=1716407032" }
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

          <h3 class="font-bold text-base">${p.name}</h3>
          <p class="text-sm text-gray-400">${p.category}</p>

          <p class="text-red-400 font-bold text-lg mt-auto">$${p.price}</p>

          <button onclick="addToCart(${p.id})"
            class="mt-2 bg-red-800 hover:bg-red-600 py-1 rounded text-sm">
            Agregar
          </button>

        </div>
      </div>
    `;
  });
}

// ➕ AGREGAR
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCart();
}

// ➖ RESTAR
function decrease(id) {
  const item = cart.find(p => p.id === id);

  if (!item) return;

  item.qty -= 1;

  if (item.qty <= 0) {
    cart = cart.filter(p => p.id !== id);
  }

  updateCart();
}

// ❌ ELIMINAR
function removeItem(id) {
  cart = cart.filter(p => p.id !== id);
  updateCart();
}

// 🛒 ACTUALIZAR
function updateCart() {
  cartItems.innerHTML = "";
  let sum = 0;
  let count = 0;

  cart.forEach(item => {
    sum += item.price * item.qty;
    count += item.qty;

    cartItems.innerHTML += `
      <div class="border-b border-red-900 py-2 text-sm">

        <div class="flex justify-between">
          <span>${item.name}</span>
          <button onclick="removeItem(${item.id})" class="text-red-500">X</button>
        </div>

        <div class="flex items-center justify-between mt-2">
          <button onclick="decrease(${item.id})" class="px-2 bg-gray-700 rounded">-</button>
          <span>${item.qty}</span>
          <button onclick="addToCart(${item.id})" class="px-2 bg-red-700 rounded">+</button>
        </div>

      </div>
    `;
  });

  cartCount.innerText = count;
  total.innerText = sum;

  renderBuyButton(count);
}

// 🟢 BOTÓN COMPRAR
function renderBuyButton(count) {
  let btn = document.getElementById("buyBtn");

  if (!btn) {
    btn = document.createElement("button");
    btn.id = "buyBtn";
    btn.className = "mt-4 w-full py-2 rounded bg-green-600";
    btn.innerText = "Comprar";

    btn.onclick = () => {
      alert("Compra realizada 🎉");
      cart = [];
      updateCart();
    };

    document.getElementById("cart").appendChild(btn);
  }

  btn.disabled = count === 0;
}

// 🔎 FILTRO
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

function filterCategory(cat) {
  currentCategory = cat;
  updateView();
}

// 🛒 CART TOGGLE
function toggleCart() {
  const cartBox = document.getElementById("cart");

  if (cartBox.classList.contains("translate-x-full")) {
    cartBox.classList.remove("translate-x-full");
  } else {
    cartBox.classList.add("translate-x-full");
  }
}

// INIT
renderProducts(products);
updateCart();