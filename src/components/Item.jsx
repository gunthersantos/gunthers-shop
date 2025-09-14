import { memo } from "react";

const Item = memo(function Item({ item, selectProduct, changeQuantity, removeFromBag }) {
  const handleQuantityChange = (e, increment) => {
    e.stopPropagation();
    changeQuantity(item.id, increment);
  };

  const handleRemoveFromBag = (e) => {
    e.stopPropagation();
    removeFromBag(item.id);
  };

  return (
    <div
      onClick={() => selectProduct(item.id)}
      className={`product ${item.isInBag ? "selected" : ""}`}
      aria-label={`${item.name} jersey, price $${item.price}`}
    >
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
        {item.isInBag && (
          <div className="quantity-area">
            <button
              disabled={item.quantity <= 1}
              onClick={(e) => handleQuantityChange(e, -1)}
              aria-label="Decrease quantity"
            >
              -
              <Minus size={16} />
            </button>
            <span className="quantity">{item.quantity}</span>
            <button
              onClick={(e) => handleQuantityChange(e, 1)}
              aria-label="Increase quantity"
            >
              +
              <Plus size={16} />
            </button>
            {/* <button
              onClick={handleRemoveFromBag}
              aria-label="Remove from bag"
              className="remove-btn"
            >
              <Trash2 size={16} />
            </button> */}
          </div>
        )}
      </div>
    </div>
  );
});

export default Item;