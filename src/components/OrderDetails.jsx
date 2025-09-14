import { useState, useRef } from "react";
import CheckoutModal from "./CheckoutModal";
import { ShoppingBag, AlertCircle } from "lucide-react"; // Ícones válidos

function OrderDetails({ itemsInBag, removeFromBag, clearBag }) {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const appContainerRef = useRef(null);

  function calculateTotal() {
    return itemsInBag.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  function calculateItemTotal(price, quantity) {
    return (price * quantity).toFixed(2);
  }

  function handleConfirm(order) {
    setShowSuccess(true);
    clearBag();

    if (appContainerRef.current) {
      appContainerRef.current.classList.add('scrolling-to-top');
    }

    setTimeout(() => {
      setCheckoutOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      setTimeout(() => {
        if (appContainerRef.current) {
          appContainerRef.current.classList.remove('scrolling-to-top');
        }
      }, 500);

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }, 1500);
  }

  return (
    <section className="summary" ref={appContainerRef}>
      {showSuccess && (
        <div className="success-notification">
          <span className="success-icon">✅</span> 
          <div>
            <h4>Order Confirmed!</h4>
            <p>Your order has been successfully placed.</p>
          </div>
        </div>
      )}

      <div className="summary-header">
        <ShoppingBag size={24} />
        <strong>Your Order</strong>
      </div>
      
      <div className="order-items">
        {itemsInBag.length === 0 ? (
          <div className="empty-bag-message">
            <AlertCircle size={48} />
            <p>Your bag is empty</p>
          </div>
        ) : (
          itemsInBag.map(item => (
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
                &times;
              </button>
            </div>
          ))
        )}
      </div>

      {itemsInBag.length > 0 && (
        <>
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
        </>
      )}

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