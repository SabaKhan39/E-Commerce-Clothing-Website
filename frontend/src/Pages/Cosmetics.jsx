import React, { useContext, useEffect, useState } from 'react';
import './CSS/Cosmetics.css';
import Item from '../Components/Item/Item';
import { ShopContext } from '../Context/ShopContext';
import cosmetics_banner from '../Components/Assets/cosmetics_banner.png';

const Cosmetics = () => {
    const { all_product } = useContext(ShopContext);
  const [newArrivals, setNewArrivals] = useState([]);
  const [additionalProducts, setAdditionalProducts] = useState([]);

  useEffect(() => {
    const newProducts = all_product.filter((item) => item.category === 'cosmetics');
    setNewArrivals(newProducts.slice(0, 4)); 
    setAdditionalProducts(newProducts.slice(4, 12)); 
  }, [all_product]);

  return (
    <div className='cosmetics-page'>
      <img className='shopcategory-banner' src={cosmetics_banner} alt="Cosmetics Banner" />
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
        <h1>Featured Products</h1>
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
  )
}

export default Cosmetics