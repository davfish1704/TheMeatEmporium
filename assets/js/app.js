/* ===================================
   The Meat Emporium - JavaScript
   WhatsApp Integration & Event Handlers
   =================================== */

// Configuration
const CONFIG = {
  whatsappPhone: '628810381017887' // +62 881-0381-01787
};

/**
 * Build WhatsApp URL with encoded message
 * @param {string} message - The message to send via WhatsApp
 * @returns {string} - Full WhatsApp URL
 */
function buildWhatsAppURL(message) {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${CONFIG.whatsappPhone}?text=${encodedMessage}`;
}

/**
 * Add product to WhatsApp order (Butcher Shop)
 * @param {string} productName - Name of the product
 * @param {number} quantity - Quantity to order
 * @param {string} unit - Unit of measurement (kg, pcs, jars, packs)
 */
function addToWhatsAppOrder(productName, quantity, unit) {
  // Validate quantity
  if (!quantity || parseFloat(quantity) <= 0) {
    alert('Please enter a quantity');
    return;
  }

  // Build WhatsApp message
  const message = `Hello Meat Emporium Butcher Shop,
I would like to order:

• ${productName} – ${quantity} ${unit}

Name:
Pickup date:
Notes:`;

  // Open WhatsApp
  const url = buildWhatsAppURL(message);
  window.open(url, '_blank');
}

/**
 * Send WhatsApp reservation or BBQ booking (Steakhouse)
 * @param {string} type - Type of booking: 'table' or 'bbq'
 */
function sendWhatsAppReservation(type) {
  let message = '';

  if (type === 'table') {
    message = `Hello Meat Emporium Steakhouse,
I would like to reserve a table.

Date:
Time:
Number of guests:
Name:`;
  } else if (type === 'bbq') {
    message = `Hello Meat Emporium Steakhouse,
I am interested in a private BBQ event.

Preferred date:
Number of guests:
Notes:`;
  }

  // Open WhatsApp
  const url = buildWhatsAppURL(message);
  window.open(url, '_blank');
}

/**
 * Initialize event listeners when DOM is ready
 */
document.addEventListener('DOMContentLoaded', function() {

  // ===================================
  // Butcher Page Event Listeners
  // ===================================

  const addToOrderButtons = document.querySelectorAll('.add-to-order-btn');

  addToOrderButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Find parent product row
      const productRow = this.closest('.product-row');

      if (productRow) {
        // Extract product name
        const productNameElement = productRow.querySelector('.product-name');
        const productName = productNameElement ? productNameElement.innerText : '';

        // Extract quantity and unit
        const quantityInput = productRow.querySelector('.quantity-input');
        const quantity = quantityInput ? quantityInput.value : '';
        const unit = quantityInput ? quantityInput.getAttribute('data-unit') : '';

        // Call WhatsApp order function
        addToWhatsAppOrder(productName, quantity, unit);
      }
    });
  });

  // ===================================
  // Steakhouse Page Event Listeners
  // ===================================

  // Reserve table button
  const reserveTableBtn = document.getElementById('reserve-table-btn');
  if (reserveTableBtn) {
    reserveTableBtn.addEventListener('click', function() {
      sendWhatsAppReservation('table');
    });
  }

  // Book BBQ button
  const bookBBQBtn = document.getElementById('book-bbq-btn');
  if (bookBBQBtn) {
    bookBBQBtn.addEventListener('click', function() {
      sendWhatsAppReservation('bbq');
    });
  }

});
