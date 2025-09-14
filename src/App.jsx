import './App.css';
import Item from './components/Item';
import OrderDetails from './components/OrderDetails';
import ProductSkeleton from './components/ProductSkeleton';
import { useShop } from './hooks/useShop';


function App() {
  const shopName = "Gunther's Shop Made with React JS";
  const { 
    items, 
    loading, 
    error, 
    bagItems, 
    selectHandler, 
    quantityHandler, 
    removeFromBag,
    clearBag
  } = useShop();

  if (error) {
    return (
      <div className="app-error">
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>{shopName}</h1>
        {bagItems.length > 0 && (
          <div className="bag-indicator">
            <span>{bagItems.length} item{bagItems.length !== 1 ? 's' : ''} in bag</span>
          </div>
        )}
      </header>

      <main>
        <section className="items">
          <h2 className="items-title">Check out the best team shirts</h2>
          <div className="items-grid">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <ProductSkeleton key={i} />)
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

        {bagItems.length > 0 ? (
          <OrderDetails 
            itemsInBag={bagItems} 
            removeFromBag={removeFromBag} 
            clearBag={clearBag} 
          />
        ) : loading ? (
          <div className="empty-cart">
            <p>Your cart is loading...</p>
          </div>
        ) : (
          <div className="empty-cart">
            <p>🛒 Your cart is empty, choose a shirt to get started!</p>
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