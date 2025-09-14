import { useState } from "react";
import CheckoutModal from "./CheckoutModal";

function OrderDetails({ itemsInBag, removeFromBag, clearBag }) {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  function calculateTotal() {
    return itemsInBag.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  function calculateItemTotal(price, quantity) {
    return (price * quantity).toFixed(2);
  }

  function handleConfirm(order) {
    // Mostra a notificação de sucesso
    setShowSuccess(true);

    // Limpa o carrinho
    clearBag();

    // Fecha o modal após 1.5s (para dar tempo da animação de processamento)
    setTimeout(() => {
      setCheckoutOpen(false);
      // Esconde a notificação após mais 1.5s (total: 3s)
      setTimeout(() => setShowSuccess(false), 1500);
    }, 1500);
  }

  return (
    <section className="summary">
      {/* Notificação de Sucesso */}
      {showSuccess && (
        <div className="success-notification">
          <span>🎉</span> Order confirmed successfully!
        </div>
      )}

      <strong>Order Summary</strong>
      <div className="order-items">
        {itemsInBag.map(item => (
          <div key={item.id} className="order-item">
            <div className="item-info">
              <span className="item-name">{item.quantity}x {item.name}</span>
              <span className="item-price">${calculateItemTotal(item.price, item.quantity)}</span>
            </div>
            <button
              onClick={() => removeFromBag(item.id)}
              className="remove-item-btn"
              aria-label="Remove item"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="order-total">
        <span>Total</span>
        <span>${calculateTotal().toFixed(2)}</span>
      </div>

      <button
        className="checkout-button"
        onClick={() => setCheckoutOpen(true)}
      >
        Proceed to Checkout
      </button>

      {checkoutOpen && (
        <CheckoutModal
          items={itemsInBag}
          total={calculateTotal()}
          onClose={() => setCheckoutOpen(false)}
          onConfirm={handleConfirm}
        />
      )}
    </section>
  );
}

export default OrderDetails;