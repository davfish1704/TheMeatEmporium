const whatsappConfig = {
  number: '6281234567890',
  steakhouse: {
    reserve: `Hello Meat Emporium Steakhouse,\nI would like to reserve a table.\nDate:\nTime:\nNumber of guests:\nName:`,
    bbq: `Hello Meat Emporium Steakhouse,\nI am interested in a private BBQ event.\nPreferred date:\nNumber of guests:\nNotes:`
  },
  butcherGreeting: 'Hello Meat Emporium Butcher Shop,\nI would like to order:\n\n'
};

function buildWhatsAppUrl(text) {
  return `https://wa.me/${whatsappConfig.number}?text=${encodeURIComponent(text)}`;
}

function initSteakhouseActions() {
  const buttons = document.querySelectorAll('[data-whatsapp-action]');
  if (!buttons.length) return;

  buttons.forEach((btn) => {
    const type = btn.getAttribute('data-whatsapp-action');
    const template = whatsappConfig.steakhouse[type] || whatsappConfig.steakhouse.reserve;
    const href = buildWhatsAppUrl(template);
    btn.setAttribute('href', href);
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      window.open(href, '_blank');
    });
  });
}

function renderButcherProducts() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  const products = [
    { heading: 'Signature Cuts' },
    { name: 'Beef Tenderloin Black Angus', price: '995k / kg', unit: 'kg' },
    { name: 'Beef Wagyu Flat Iron', price: '682k / kg', unit: 'kg' },
    { name: 'Rib-Eye Black Angus', price: '865k / kg', unit: 'kg' },
    { name: 'Beef Rump Black Angus', price: '500k / kg', unit: 'kg' },
    { name: 'Striploin Grass Fed', price: '583k / kg', unit: 'kg' },
    { name: 'Striploin Black Angus', price: '668k / kg', unit: 'kg' },
    { name: 'Pork Neck', price: '190k / kg', unit: 'kg' },
    { heading: 'Sausages' },
    { name: 'Beef Thick Sausages', price: '235k / kg + 10% tax', unit: 'kg', tax: true },
    { name: 'Beef Thin Sausages', price: '255k / kg + 10% tax', unit: 'kg', tax: true },
    { name: 'Beef Bratwurst Sausages', price: '265k / kg + 10% tax', unit: 'kg', tax: true },
    { name: 'Beef Tomato Onion Sausages', price: '265k / kg + 10% tax', unit: 'kg', tax: true },
    { name: 'Spicy Chorizo Sausages', price: '265k / kg + 10% tax', unit: 'kg', tax: true },
    { name: 'Irish Pork Sausages', price: '230k / kg + 10% tax', unit: 'kg', tax: true },
    { heading: 'Other Products' },
    { name: 'Salmon Norwegian Fillet', price: '600k / kg', unit: 'kg' },
    { name: 'Smoked Salmon', price: '850k / kg + 10% tax', unit: 'kg', tax: true },
    { name: 'Beef Tallow', price: '45k / jar + 10% tax', unit: 'jars', tax: true },
    { name: 'Tomato Pickle', price: '45k / jar + 10% tax', unit: 'jars', tax: true },
    { name: 'Pizza Bacon', price: '50k / pack + 10% tax', unit: 'packs', tax: true },
    { name: 'Beef Pastrami', price: '280k / kg + 10% tax', unit: 'kg', tax: true },
    { name: 'Eye Bacon', price: '275k / kg + 10% tax', unit: 'kg', tax: true },
    { heading: 'Frozen / Ready' },
    { name: 'Sausage Roll', price: '30k / pc + 10% tax', unit: 'pcs', tax: true },
    { name: 'Chunky Beef Red Wine Pie', price: '50k / pc + 10% tax', unit: 'pcs', tax: true },
    { name: 'Aussie Minced Pie', price: '45k / pc + 10% tax', unit: 'pcs', tax: true },
    { name: 'Apple & Cinnamon Pie', price: '50k / pc + 10% tax', unit: 'pcs', tax: true },
    { heading: 'Minced & Poultry' },
    { name: 'Beef Burger Patty', price: '232k / kg + 10% tax', unit: 'kg', tax: true },
    { name: 'Beef Chuck Tenderloin', price: '227.5k / kg', unit: 'kg' },
    { name: 'Minced Beef', price: '225k / kg', unit: 'kg' },
    { name: 'Chicken Breast', price: '98.5k / kg', unit: 'kg' }
  ];

  products.forEach((item) => {
    if (item.heading) {
      const divider = document.createElement('div');
      divider.className = 'menu-divider';
      divider.innerHTML = `<span>${item.heading}</span>`;
      grid.appendChild(divider);
      return;
    }

    const card = document.createElement('article');
    card.className = 'product-card';
    card.innerHTML = `
      <h3>${item.name}</h3>
      <div class="product-meta">
        <span class="price">${item.price}</span>
        ${item.tax ? '<span class="tag">+10% tax</span>' : '<span class="tag">Standard price</span>'}
      </div>
      <div class="input-row">
        <label class="muted" for="qty-${item.name.replace(/\s+/g, '-').toLowerCase()}">Qty (${item.unit})</label>
        <input type="number" min="0" step="0.1" id="qty-${item.name.replace(/\s+/g, '-').toLowerCase()}" placeholder="0" aria-label="Quantity for ${item.name}">
      </div>
      <button class="btn add-btn" data-name="${item.name}" data-unit="${item.unit}">Add to WhatsApp Order</button>
    `;
    grid.appendChild(card);
  });
}

function initButcherOrderFlow() {
  const listEl = document.getElementById('order-list');
  const sendBtn = document.getElementById('send-order');
  const clearBtn = document.getElementById('clear-order');
  const grid = document.getElementById('product-grid');
  if (!listEl || !sendBtn || !clearBtn || !grid) return;

  const orderItems = [];
  renderOrderList();

  function renderOrderList() {
    listEl.innerHTML = '';
    if (!orderItems.length) {
      const empty = document.createElement('li');
      empty.className = 'muted';
      empty.textContent = 'No items added yet. Choose a cut below to start your WhatsApp order.';
      listEl.appendChild(empty);
      return;
    }
    orderItems.forEach((item, index) => {
      const li = document.createElement('li');
      li.innerHTML = `<span>${item.name} — ${item.quantity} ${item.unit}</span><button class="btn btn-outline" data-remove="${index}">Remove</button>`;
      listEl.appendChild(li);
    });
  }

  function buildOrderMessage() {
    const header = whatsappConfig.butcherGreeting;
    const lines = orderItems.map((item) => `• ${item.name} – ${item.quantity} ${item.unit}`).join('\n');
    const footer = '\n\nName:\nPickup date:\nNotes:';
    return `${header}${lines}${footer}`;
  }

  grid.addEventListener('click', (event) => {
    const button = event.target.closest('.add-btn');
    if (!button) return;

    const name = button.getAttribute('data-name');
    const unit = button.getAttribute('data-unit');
    const input = button.parentElement.querySelector('input[type="number"]');
    const quantity = input.value.trim();

    if (!quantity || Number(quantity) <= 0) {
      input.focus();
      return;
    }

    orderItems.push({ name, quantity, unit });
    input.value = '';
    renderOrderList();
  });

  listEl.addEventListener('click', (event) => {
    const removeBtn = event.target.closest('[data-remove]');
    if (!removeBtn) return;
    const index = Number(removeBtn.getAttribute('data-remove'));
    orderItems.splice(index, 1);
    renderOrderList();
  });

  sendBtn.addEventListener('click', () => {
    if (!orderItems.length) {
      alert('Please add at least one item to your order.');
      return;
    }
    const message = buildOrderMessage();
    window.open(buildWhatsAppUrl(message), '_blank');
  });

  clearBtn.addEventListener('click', () => {
    orderItems.length = 0;
    renderOrderList();
  });
}

renderButcherProducts();
initButcherOrderFlow();
initSteakhouseActions();
