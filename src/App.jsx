import { useRef, useState } from 'react';
import './App.css';
import Item from './components/Item';
import OrderDetails from './components/OrderDetails';
import ProductSkeleton from './components/ProductSkeleton';
import OrderDetailsSkeleton from './components/OrderDetailsSkeleton';
import { useShop } from './hooks/useShop';
import { Search } from 'lucide-react';

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
    clearBag
  } = useShop();

  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const appContainerRef = useRef(null);

  // Filtrar itens baseado no termo de pesquisa
  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.body.classList.toggle('dark-mode', newDarkMode);
  };

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
    <div className={`app-container ${darkMode ? 'dark-mode' : ''}`} ref={appContainerRef}>
      <header className="app-header">
        <div className="header-content">
          <h1>{shopName}</h1>
          <div className="header-controls">
            <div className="search-container">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search jerseys..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="header-right">
              {bagItems.length > 0 && (
                <div className="bag-indicator">
                  <span className="bag-count">{bagItems.length}</span>
                  <span>item{bagItems.length !== 1 ? 's' : ''} in bag</span>
                </div>
              )}
              <button onClick={toggleDarkMode} className="dark-mode-toggle">
                <img 
                  src="./assets/dark-theme.svg" 
                  alt="Dark mode toggle" 
                  className="dark-mode-icon"
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="items">
          <h2 className="items-title">Premium Football Jerseys</h2>
          <div className="items-grid">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
              : filteredItems.map(item => (
                  <Item
                    key={item.id}
                    item={item}
                    selectProduct={selectHandler}
                    changeQuantity={quantityHandler}
                    removeFromBag={removeFromBag}
                  />
                ))}
          </div>
          {!loading && filteredItems.length === 0 && (
            <div className="no-results">
              <p>No jerseys found matching "{searchTerm}"</p>
            </div>
          )}
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
        <p>&copy; 2025 Gunther's Jersey Shop. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
