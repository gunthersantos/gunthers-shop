import { useState } from "react";

function CheckoutModal({ items, total, onClose, onConfirm }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);

    setTimeout(() => {
      onConfirm({ name, address, items, total });
      setProcessing(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Checkout</h2>
        
        {processing && (
          <div className="processing-message">
            <div className="spinner"></div>
            Processing your order...
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              disabled={processing}
              placeholder="Enter your full name"
            />
          </label>

          <label>
            Address:
            <input
              type="text"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
              disabled={processing}
              placeholder="Enter your shipping address"
            />
          </label>

          <div className="checkout-summary">
            <p><strong>Total: ${total.toFixed(2)}</strong></p>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              onClick={onClose}
              disabled={processing}
              className="cancel-btn"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="confirm-btn"
              disabled={processing}
            >
              {processing ? "Processing..." : "Confirm Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CheckoutModal;