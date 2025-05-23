const sheetUrl =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQIWrTUegBg8MLszZasF6qH5qD7UxjqQqGSe9iKAkylqPLQHdxnydaY0yMpSuE7e4oMik9dZSqsmHij/pub?gid=0&single=true&output=csv";

let inventoryData = [];
let cart = [];
let currentSort = {
  column: null,
  direction: 'asc'
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('searchInput').addEventListener('input', displayInventory);
  document.querySelectorAll('.sort-btn').forEach(btn => {
    btn.addEventListener('click', () => sortInventory(btn.dataset.sort));
  });
  document.getElementById('clearCartBtn').addEventListener('click', () => {
    cart = [];
    updateCart();
  });
  loadInventory();
});

async function loadInventory() {
  try {
    const response = await fetch(sheetUrl);
    if (!response.ok) throw new Error(`Error fetching data: ${response.status}`);
    const csvText = await response.text();
    const rows = csvText.split('\n').map(row => {
      if (row.trim()) {
        return row.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g)?.map(col => col.replace(/^"|"$/g, "").trim()) || [];
      }
      return [];
    });
    inventoryData = rows.slice(1)
      .filter(row => row.length >= 6 && row[0])
      .map(row => ({
        name: row[0] || '',
        variant: row[1] || '',
        type: row[2] || '',
        price: parseFloat((row[3] || '').replace(/[^0-9.]/g, '')) || 0,
        stock: parseInt((row[4] || '').replace(/[^0-9]/g, '')) || 0,
        status: row[5] || ''
      }));
    displayInventory();
  } catch (error) {
    console.error("Error fetching inventory data:", error);
    document.getElementById("inStockBody").innerHTML = `<tr><td colspan="7">Failed to load data.</td></tr>`;
    document.getElementById("outOfStockBody").innerHTML = `<tr><td colspan="7">Failed to load data.</td></tr>`;
  }
}

function displayInventory() {
  const inStockBody = document.getElementById("inStockBody");
  const outOfStockBody = document.getElementById("outOfStockBody");
  inStockBody.innerHTML = '';
  outOfStockBody.innerHTML = '';

  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const filteredData = inventoryData.filter(item =>
    item.name.toLowerCase().includes(searchTerm) ||
    item.variant.toLowerCase().includes(searchTerm) ||
    item.type.toLowerCase().includes(searchTerm)
  );

  filteredData.forEach((item, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.name}</td>
      <td>${item.variant}</td>
      <td>${item.type}</td>
      <td>$${item.price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
      <td class="stock-col">${item.stock}</td>
      <td><span class="status ${item.status.toLowerCase().replace(' ', '-')}">${item.status}</span></td>
      <td>
        ${item.stock > 0 ? `<button class="add-to-cart-btn" data-idx="${idx}">Add to Cart</button>` : ''}
      </td>
    `;
    if (item.stock > 0) {
      inStockBody.appendChild(tr);
    } else {
      outOfStockBody.appendChild(tr);
    }
  });
  // Attach event listeners for Add to Cart buttons
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const idx = parseInt(this.getAttribute('data-idx'));
      addToCart(filteredData[idx]);
    });
  });
}

function addToCart(item) {
  const existingItem = cart.find(cartItem =>
    cartItem.name === item.name &&
    cartItem.variant === item.variant
  );
  if (existingItem) {
    if (existingItem.quantity < item.stock) {
      existingItem.quantity++;
    }
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  updateCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  const cartElement = document.getElementById('cart');
  const totalElement = document.getElementById('cartTotal');
  cartElement.innerHTML = '';
  let total = 0;
  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <span>${item.name} (${item.variant})</span>
      <input type="number" min="1" max="${item.stock}" value="${item.quantity}" class="cart-qty-input" data-index="${index}" style="width: 60px; margin: 0 8px;">
      <span>$${itemTotal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartElement.appendChild(div);
  });
  // Add event listeners for quantity inputs
  document.querySelectorAll('.cart-qty-input').forEach(input => {
    input.addEventListener('change', function() {
      const idx = parseInt(this.getAttribute('data-index'));
      let val = parseInt(this.value);
      if (isNaN(val) || val < 1) val = 1;
      if (val > cart[idx].stock) val = cart[idx].stock;
      cart[idx].quantity = val;
      updateCart();
    });
  });
  totalElement.textContent = total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
}

function sortInventory(column) {
  if (currentSort.column === column) {
    currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
  } else {
    currentSort.column = column;
    currentSort.direction = 'asc';
  }
  inventoryData.sort((a, b) => {
    let valueA = a[column];
    let valueB = b[column];
    if (column === 'price' || column === 'stock') {
      valueA = parseFloat(valueA);
      valueB = parseFloat(valueB);
    } else {
      valueA = String(valueA).toLowerCase();
      valueB = String(valueB).toLowerCase();
    }
    if (valueA < valueB) return currentSort.direction === 'asc' ? -1 : 1;
    if (valueA > valueB) return currentSort.direction === 'asc' ? 1 : -1;
    return 0;
  });
  displayInventory();
}
