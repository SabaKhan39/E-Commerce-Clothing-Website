import React, { useContext, useEffect, useState } from 'react';
import './CSS/Kid.css';
import Item from '../Components/Item/Item';
import { ShopContext } from '../Context/ShopContext';
import kid_banner from '../Components/Assets/kid_banner.png';
import tops from '../Components/Assets/18.png';
import bottom from '../Components/Assets/19.png';
import dresses from '../Components/Assets/20.png';
import g_ethnic_wear from '../Components/Assets/21.png';
import sandals from '../Components/Assets/22.png';
import shirts from '../Components/Assets/23.png';
import tshirts from '../Components/Assets/24.png';
import jeans from '../Components/Assets/25.png';
import b_ethnic_wear from '../Components/Assets/26.png'
import shoes from '../Components/Assets/27.png';

const Kid = () => {
  const { all_product } = useContext(ShopContext);
  const [newArrivals, setNewArrivals] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('girls');

  useEffect(() => {
    const filteredProducts = all_product.filter((item) =>
      selectedCategory === 'girls'
        ? ['g_tops', 'g_bottoms', 'g_dresses', 'g_ethnic_wear', 'g_sandals'].includes(item.category)
        : ['b_shirts', 'b_tshirts', 'b_jeans', 'b_ethnic_wear', 'b_shoes'].includes(item.category)
    );
    setNewArrivals(filteredProducts.slice(24, 40));
  }, [all_product, selectedCategory]);

  const handleCollectionClick = (category) => {
    window.location.href = `/kids/${category}`;
  };

  const handleToggle = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className='kids-page'>
      <img className='kids-banner' src={kid_banner} alt="Kids Banner" />
      <div className='toggle-buttons'>
        <button
          className={`toggle-button ${selectedCategory === 'girls' ? 'active' : ''}`}
          onClick={() => handleToggle('girls')}
        >
          GIRLS
        </button>
        <button
          className={`toggle-button ${selectedCategory === 'boys' ? 'active' : ''}`}
          onClick={() => handleToggle('boys')}
        >
          BOYS
        </button>
      </div>
      <div className='kids-categories'>
        {selectedCategory === 'girls' && (
          <>
            <div className='category-container' onClick={() => handleCollectionClick('g_tops')}>
              <div className='category-circle'>
                <img src={tops} alt="" />
              </div>
              <p>Tops</p>
            </div>
            <div className='category-container' onClick={() => handleCollectionClick('g_bottoms')}>
              <div className='category-circle'>
                <img src={bottom} alt="" />
              </div>
              <p>Bottom</p>
            </div>
            <div className='category-container' onClick={() => handleCollectionClick('g_dresses')}>
              <div className='category-circle'>
                <img src={dresses} alt="" />
              </div>
              <p>Dresses</p>
            </div>
            <div className='category-container' onClick={() => handleCollectionClick('g_ethnic_wear')}>
              <div className='category-circle'>
                <img src={g_ethnic_wear} alt="" />
              </div>
              <p>Ethnic Wear</p>
            </div>
            <div className='category-container' onClick={() => handleCollectionClick('g_sandals')}>
              <div className='category-circle'>
                <img src={sandals} alt="" />
              </div>
              <p>Sandals</p>
            </div>
          </>
        )}
        {selectedCategory === 'boys' && (
          <>
            <div className='category-container' onClick={() => handleCollectionClick('b_shirts')}>
              <div className='category-circle'>
                <img src={shirts} alt="" />
              </div>
              <p>Shirts</p>
            </div>
            <div className='category-container' onClick={() => handleCollectionClick('b_tshirts')}>
              <div className='category-circle'>
                <img src={tshirts} alt="" />
              </div>
              <p>Jeans</p>
            </div>
            <div className='category-container' onClick={() => handleCollectionClick('b_jeans')}>
              <div className='category-circle'>
                <img src={jeans} alt="" />
              </div>
              <p>T-Shirts</p>
            </div>
            <div className='category-container' onClick={() => handleCollectionClick('b_ethnic_wear')}>
              <div className='category-circle'>
                <img src={b_ethnic_wear} alt="" />
              </div>
              <p>Ethnic Wear</p>
            </div>
            <div className='category-container' onClick={() => handleCollectionClick('b_shoes')}>
              <div className='category-circle'>
                <img src={shoes} alt="" />
              </div>
              <p>Shoes</p>
            </div>
          </>
        )}
      </div>

      <div className='kids-indexSort'>
        <h1>New Arrivals</h1>
        <hr />
        <div className="kids-products">
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
    </div>
  );
}

export default Kid;
