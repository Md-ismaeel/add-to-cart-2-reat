import { useState } from 'react'
import './App.css'
import { Product } from './Components/Product';
import { ProductCart } from './Components/ProductCart';


function App() {
  const [itemData, setItemData] = useState([]);
  const [quantities, setQuantities] = useState({});

  const addToCart = (product, quantity) => {
    const existingItemIndex = itemData.findIndex((item) => item.id === product.id);

    if (existingItemIndex !== -1) {
      const temp = [...itemData];
      temp[existingItemIndex].quantity += quantity;
      setItemData(temp);
    } else {
      setItemData([...itemData, { ...product, quantity }]);
    }

    const updatedQuantity = (quantities[product.id] || 0) + quantity;
    setQuantities({
      ...quantities,
      [product.id]: updatedQuantity >= 0 ? updatedQuantity : 0,
    });
  };



  const removeFromCart = (productId) => {
    const existingItemIndex = itemData.findIndex((item) => item.id === productId);

    if (existingItemIndex !== -1) {
      const temp = [...itemData];
      temp.splice(existingItemIndex, 1);
      setItemData(temp);

      setQuantities((prevState) => {
        const { [productId]: removedQuantity, ...restQuantities } = prevState;
        return restQuantities;
      });
    }
  };



  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 0) {
      removeFromCart(productId);
      return;
    }

    setQuantities({
      ...quantities,
      [productId]: newQuantity,
    });

    const updatedItemData = itemData.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setItemData(updatedItemData);
  };

  

  return (
    <div className="w-full justify-center items-center flex flex-col m-4 p-2">
      <Product addToCart={addToCart} quantities={quantities} />
      <ProductCart
        itemData={itemData}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
      />
    </div>
  );
}

export default App;
