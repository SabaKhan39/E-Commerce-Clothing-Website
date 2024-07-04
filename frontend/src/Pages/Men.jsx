import React, { useContext, useEffect, useState } from 'react';
import './CSS/Men.css';
import Item from '../Components/Item/Item';
import { ShopContext } from '../Context/ShopContext';
import cloth_banner from '../Components/Assets/mens_banner.png';
import shirts from '../Components/Assets/1.png'
import tshirts from '../Components/Assets/2.png'
import sweatshirts from '../Components/Assets/3.png'
import jackets from '../Components/Assets/4.png'
import jeans from '../Components/Assets/5.png'
import kurta from '../Components/Assets/6.png'
import watches from '../Components/Assets/7.png'
import shoes from '../Components/Assets/8.png'


const Men = () => {

    const { all_product } = useContext(ShopContext);
    const [newArrivals, setNewArrivals] = useState([]);

    useEffect(() => {
        const newProducts = all_product.filter((item) =>
          item.category === 'shirts' ||
        item.category === 'tshirts' ||
        item.category === 'sweatshirts' ||
        item.category === 'jackets' ||
        item.category === 'jeans' ||
        item.category === 'kurta' ||
        item.category === 'watches' ||
        item.category === 'shoes'
        );
        setNewArrivals(newProducts.slice(26, 42));
      }, [all_product]);
    
      const handleCollectionClick = (category) => {
        window.location.href = `/mens/${category}`;
      };

  return (
    <div className='mens-page'>
    <img className='mens-banner' src={cloth_banner} alt="Mens Banner" />
    
    <div className='mens-categories'>
        <div className='category-container' onClick={() => handleCollectionClick('shirts')}>
            <div className='category-circle'>
                <img className='category-icon' src={shirts} alt="Shirts" />
            </div>
            <p>Shirts</p>
        </div>
        <div className='category-container' onClick={() => handleCollectionClick('tshirts')}>
            <div className='category-circle'>
            <img className='category-icon' src={tshirts} alt="Shirts" />
            </div>
            <p>T-Shirts</p>
        </div>
        <div className='category-container' onClick={() => handleCollectionClick('sweatshirts')}>
            <div className='category-circle'>
            <img className='category-icon' src={sweatshirts} alt="Shirts" />
            </div>
            <p>Sweatshirts</p>
        </div>
        <div className='category-container' onClick={() => handleCollectionClick('jackets')}>
            <div className='category-circle'>
            <img className='category-icon' src={jackets} alt="Shirts" />
            </div>
            <p>Jackets</p>
        </div>
        <div className='category-container' onClick={() => handleCollectionClick('jeans')}>
            <div className='category-circle'>
            <img className='category-icon' src={jeans} alt="Shirts" />
            </div>
            <p>Jeans</p>
        </div>
        <div className='category-container' onClick={() => handleCollectionClick('kurta')}>
            <div className='category-circle'>
            <img className='category-icon' src={kurta} alt="Shirts" />
            </div>
            <p>Kurta</p>
        </div>
        <div className='category-container' onClick={() => handleCollectionClick('watches')}>
            <div className='category-circle'>
            <img className='category-icon' src={watches} alt="Shirts" />
            </div>
            <p>Watches</p>
        </div>
        <div className='category-container' onClick={() => handleCollectionClick('shoes')}>
            <div className='category-circle'>
            <img className='category-icon' src={shoes} alt="Shirts" />
            </div>
            <p>Shoes</p>
        </div>
    </div>

    <div className='mens-indexSort'>
        <h1>New Arrivals</h1>
        <hr />
        <div className="mens-products">
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

export default Men