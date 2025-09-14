import { useState } from "react";
import { X, Loader } from "lucide-react"; // Certifique-se de usar apenas ícones existentes

function CheckoutModal({ items, total, onClose, onConfirm }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);

    setTimeout(() => {
      onConfirm({ name, address, email, items, total });
      setProcessing(false);
    }, 1500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Complete Your Order</h2>
          <button className="close-btn" onClick={onClose} disabled={processing}>
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              value={name}
              required
              placeholder="Enter your full name"
              onChange={(e) => setName(e.target.value)}
              disabled={processing}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              required
              placeholder="your.email@example.com"
              onChange={(e) => setEmail(e.target.value)}
              disabled={processing}
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Shipping Address</label>
            <textarea
              id="address"
              value={address}
              required
              rows="3"
              placeholder="Enter your complete shipping address"
              onChange={(e) => setAddress(e.target.value)}
              disabled={processing}
            ></textarea>
          </div>

          <div className="order-summary">
            <h3>Order Summary</h3>
            {items.map(item => (
              <div key={item.id} className="order-item-summary">
                <span>{item.quantity}x {item.name}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="order-total-summary">
              <strong>Total</strong>
              <strong>${total.toFixed(2)}</strong>
            </div>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              onClick={onClose}
              disabled={processing}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={processing}
            >
              {processing ? (
                <>
                  <Loader size={18} className="spinner" />
                  Processing...
                </>
              ) : (
                `Confirm Order - $${total.toFixed(2)}`
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CheckoutModal;