import { useState, useEffect, useCallback } from 'react';
import { fetchProducts } from '../services/api';
import { useLocalStorage } from './useLocalStorage';

export const useShop = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [bagItems, setBagItems] = useLocalStorage('bagItems', []);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const products = await fetchProducts();
        setItems(products);
        
        // Restore bag items from localStorage
        if (bagItems.length > 0) {
          const updatedItems = products.map(product => {
            const bagItem = bagItems.find(item => item.id === product.id);
            return bagItem ? { ...product, isInBag: true, quantity: bagItem.quantity } : product;
          });
          setItems(updatedItems);
        }
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  // Sincroniza os items quando bagItems mudar (apenas se items já carregados)
  useEffect(() => {
    if (items.length === 0) return;
    const updatedItems = items.map(product => {
      const bagItem = bagItems.find(item => item.id === product.id);
      return bagItem 
        ? { ...product, isInBag: true, quantity: bagItem.quantity } 
        : { ...product, isInBag: false, quantity: 1 };
    });
    setItems(updatedItems);
  }, [bagItems]);

  const selectHandler = useCallback((id) => {
    setItems(prevItems => {
      const updatedItems = prevItems.map(item => 
        item.id === id 
          ? { ...item, isInBag: !item.isInBag, quantity: item.isInBag ? 1 : item.quantity } 
          : item
      );
      
      const newBagItems = updatedItems.filter(item => item.isInBag);
      setBagItems(newBagItems);
      
      return updatedItems;
    });
  }, [setBagItems]);

  const quantityHandler = useCallback((id, increment) => {
    setItems(prevItems => {
      const updatedItems = prevItems.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, item.quantity + increment) } 
          : item
      );
      
      const newBagItems = updatedItems.filter(item => item.isInBag);
      setBagItems(newBagItems);
      
      return updatedItems;
    });
  }, [setBagItems]);

  const removeFromBag = useCallback((id) => {
    setItems(prevItems => {
      const updatedItems = prevItems.map(item => 
        item.id === id 
          ? { ...item, isInBag: false, quantity: 1 } 
          : item
      );
      
      const newBagItems = updatedItems.filter(item => item.isInBag);
      setBagItems(newBagItems);
      
      return updatedItems;
    });
  }, [setBagItems]);

  const clearBag = useCallback(() => {
    setItems(prevItems => 
      prevItems.map(item => ({ ...item, isInBag: false, quantity: 1 }))
    );
    setBagItems([]);
  }, [setBagItems]);

  return {
    items,
    loading,
    error,
    bagItems,
    selectHandler,
    quantityHandler,
    removeFromBag,
    clearBag
  };
};