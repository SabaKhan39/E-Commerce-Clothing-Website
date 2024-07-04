import React, { useContext, useEffect, useState } from 'react';
import './CSS/Women.css';
import Item from '../Components/Item/Item';
import { ShopContext } from '../Context/ShopContext';
import cloth_banner from '../Components/Assets/women_banner.png';
import tops from '../Components/Assets/9.png'
import bottoms from '../Components/Assets/10.png'
import blazer from '../Components/Assets/11.png'
import dress from '../Components/Assets/12.png'
import kurtaset from '../Components/Assets/13.png'
import saree from '../Components/Assets/14.png'
import gowns from '../Components/Assets/15.png'
import sandals from '../Components/Assets/16.png'
import cosmetics from '../Components/Assets/17.png'

const Women = () => {
    const { all_product } = useContext(ShopContext);
    const [newArrivals, setNewArrivals] = useState([]);

    useEffect(() => {
        const newProducts = all_product.filter((item) =>
          item.category === 'tops' ||
        item.category === 'bottoms' ||
        item.category === 'blazer' ||
        item.category === 'dress' ||
        item.category === 'kurtaset' ||
        item.category === 'saree' ||
        item.category === 'gowns' ||
        item.category === 'sandals' ||
        item.category === 'cosmetics' 
        );
        setNewArrivals(newProducts.slice(32, 48));
      }, [all_product]);
    
      const handleCollectionClick = (category) => {
        window.location.href = `/womens/${category}`;
      };

  return (
    <div className='womens-page'>
    <img className='womens-banner' src={cloth_banner} alt="womens Banner" />
    
    <div className='womens-categories'>
        <div className='category-container' onClick={() => handleCollectionClick('tops')}>
            <div className='category-circle'>
                <img className='category-icon' src={tops} alt="" />
            </div>
            <p>Tops</p>
        </div>
        <div className='category-container' onClick={() => handleCollectionClick('bottoms')}>
            <div className='category-circle'>
            <img className='category-icon' src={bottoms} alt="" />
            </div>
            <p>Bottoms</p>
        </div>
        <div className='category-container' onClick={() => handleCollectionClick('blazer')}>
            <div className='category-circle'>
            <img className='category-icon' src={blazer} alt="" />
            </div>
            <p>Blazer</p>
        </div>
        <div className='category-container' onClick={() => handleCollectionClick('dress')}>
            <div className='category-circle'>
            <img className='category-icon' src={dress} alt="" />
            </div>
            <p>Dress</p>
        </div>
        <div className='category-container' onClick={() => handleCollectionClick('kurtaset')}>
            <div className='category-circle'>
            <img className='category-icon' src={kurtaset} alt="" />
            </div>
            <p>Kurta Set</p>
        </div>
        <div className='category-container' onClick={() => handleCollectionClick('saree')}>
            <div className='category-circle'>
            <img className='category-icon' src={saree} alt="" />
            </div>
            <p>Saree</p>
        </div>
        <div className='category-container' onClick={() => handleCollectionClick('gowns')}>
            <div className='category-circle'>
            <img className='category-icon' src={gowns} alt="" />
            </div>
            <p>Gowns</p>
        </div>
        <div className='category-container' onClick={() => handleCollectionClick('sandals')}>
            <div className='category-circle'>
            <img className='category-icon' src={sandals} alt="" />
            </div>
            <p>Sandals</p>
        </div>
        <div className='category-container' onClick={() => handleCollectionClick('cosmetics')}>
            <div className='category-circle'>
            <img className='category-icon' src={cosmetics} alt="" />
            </div>
            <p>Cosmetics</p>
        </div>
    </div>

    <div className='womens-indexSort'>
        <h1>New Arrivals</h1>
        <hr />
        <div className="womens-products">
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
  )
}

export default Women