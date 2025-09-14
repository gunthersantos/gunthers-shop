import { useRef } from 'react';
import './App.css';
import Item from './components/Item';
import OrderDetails from './components/OrderDetails';
import ProductSkeleton from './components/ProductSkeleton';
import OrderDetailsSkeleton from './components/OrderDetailsSkeleton';
import { useShop } from './hooks/useShop';

function App() {
  const shopName = "Gunther's Jersey Shop";
  const { 
    items, 
    loading, 
    error, 
    bagItems, 
    selectHandler, 
    quantityHandler, 
    removeFromBag,
    clearBag // Agora o clearBag vem diretamente do hook useShop
  } = useShop();

  const appContainerRef = useRef(null);

  if (error) {
    return (
      <div className="app-error">
        <div className="error-content">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container" ref={appContainerRef}>
      <header className="app-header">
        <div className="header-content">
          <h1>{shopName}</h1>
          {bagItems.length > 0 && (
            <div className="bag-indicator">
              <span className="bag-count">{bagItems.length}</span>
              <span>item{bagItems.length !== 1 ? 's' : ''} in bag</span>
            </div>
          )}
        </div>
      </header>

      <main>
        <section className="items">
          <h2 className="items-title">Premium Football Jerseys</h2>
          <div className="items-grid">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
              : items.map(item => (
                  <Item
                    key={item.id}
                    item={item}
                    selectProduct={selectHandler}
                    changeQuantity={quantityHandler}
                    removeFromBag={removeFromBag}
                  />
                ))}
          </div>
        </section>

        {loading ? (
          <OrderDetailsSkeleton />
        ) : bagItems.length > 0 ? (
          <OrderDetails 
            itemsInBag={bagItems} 
            removeFromBag={removeFromBag} 
            clearBag={clearBag} 
          />
        ) : (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h3>Your cart is empty</h3>
            <p>Choose a jersey to get started!</p>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>&copy; 2025 Gunther's Shop. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;