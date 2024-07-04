import React, { useContext, useEffect, useState } from 'react';
import './CSS/Electronics.css';
import Item from '../Components/Item/Item';
import { ShopContext } from '../Context/ShopContext';
import electronics_banner from '../Components/Assets/gadgets_banner.png';

const Electronics = () => {
    const { all_product } = useContext(ShopContext);
  const [newArrivals, setNewArrivals] = useState([]);
  const [additionalProducts, setAdditionalProducts] = useState([]);

  useEffect(() => {
    const newProducts = all_product.filter((item) => item.category === 'electronics');
    setNewArrivals(newProducts.slice(8, 12)); 
    setAdditionalProducts(newProducts.slice(0, 8)); 
  }, [all_product]);

  return (
    <div className='electronics-page'>
      <img className='shopcategory-banner' src={electronics_banner} alt="Electronics Banner" />
      <div className='shopcategory-indexSort'>
        <h1>New Arrivals</h1>
        <hr />
        <div className="shopcategory-products">
          {newArrivals.map((item, i) => (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))}
        </div>
      </div>
      <div className='shopcategory-indexSort'>
        <h1>Best Sellers</h1>
        <hr />
        <div className="shopcategory-products">
          {additionalProducts.map((item, i) => (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Electronics;