import { memo } from "react";
import { Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";

const Item = memo(function Item({ item, selectProduct, changeQuantity, removeFromBag }) {
  const handleQuantityChange = (e, increment) => {
    e.stopPropagation();
    changeQuantity(item.id, increment);
  };

  const handleRemoveFromBag = (e) => {
    e.stopPropagation();
    removeFromBag(item.id);
  };

  const handleSelectProduct = () => {
    selectProduct(item.id);
  };

  return (
    <div
      onClick={handleSelectProduct}
      className={`product ${item.isInBag ? "selected" : ""}`}
      aria-label={`${item.name} jersey, price $${item.price}`}
    >
      <div className="product-badge">
        {item.isInBag && <div className="in-bag-badge">In Bag</div>}
      </div>
      
      <div className="photo">
        <img
          src={`/img/${item.photo}`}
          alt={item.name}
          loading="lazy"
        />
      </div>
      
      <div className="description">
        <span className="name">{item.name}</span>
        <span className="price">$ {item.price.toFixed(2)}</span>
        
        {item.isInBag ? (
          <div className="quantity-controls">
            <div className="quantity-area">
              <button
                disabled={item.quantity <= 1}
                onClick={(e) => handleQuantityChange(e, -1)}
                aria-label="Decrease quantity"
                className="quantity-btn"
              >
                <Minus size={16} />
              </button>
              <span className="quantity">{item.quantity}</span>
              <button
                onClick={(e) => handleQuantityChange(e, 1)}
                aria-label="Increase quantity"
                className="quantity-btn"
              >
                <Plus size={16} />
              </button>
            </div>
            
            <button
              onClick={handleRemoveFromBag}
              className="remove-btn"
              aria-label="Remove from bag"
            >
              <Trash2 size={16} />
              Remove
            </button>
          </div>
        ) : (
          <button className="add-to-bag-btn">
            <ShoppingBag size={16} />
            Add to Bag
          </button>
        )}
      </div>
    </div>
  );
});

export default Item;