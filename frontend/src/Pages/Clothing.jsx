import React, { useContext, useEffect, useState } from 'react';
import './CSS/Clothing.css';
import Item from '../Components/Item/Item';
import { ShopContext } from '../Context/ShopContext';
import cloth_banner from '../Components/Assets/cloth_banner.png';
import women from '../Components/Assets/product_9.png';
import men from '../Components/Assets/product_17.png';
import kid from '../Components/Assets/product_28.png';

const Clothing = () => {
  const { all_product } = useContext(ShopContext);
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    const newProducts = all_product.filter((item) =>
      item.category === 'women' || item.category === 'men' || item.category === 'kid'
    );
    setNewArrivals(newProducts.slice(4, 8));
  }, [all_product]);

  const handleCollectionClick = (category) => {
    window.location.href = `/clothing/${category}`;
  };

  return (
    <div className='clothing-page'>
      <img className='clothing-banner' src={cloth_banner} alt="Clothing Banner" />
      <div className='clothing-indexSort'>
        <h1>New Arrivals</h1>
        <hr />
        <div className="clothing-products">
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
      <div className='clothing-text'>
        <h2>Shop By Categories</h2>
        <hr />
      </div>
      <div className='shopcategory-collections'>
        <div className='collection-container' onClick={() => handleCollectionClick('women')}>
          <img src={women} alt="" />
          <p>Women's Collection</p>
        </div>
        <div className='collection-container' onClick={() => handleCollectionClick('men')}>
          <img src={men} alt="" />
          <p>Men's Collection</p>
        </div>
        <div className='collection-container' onClick={() => handleCollectionClick('kid')}>
          <img src={kid} alt="" />
          <p>Kid's Collection</p>
        </div>
      </div>
    </div>
  );
}

export default Clothing;
