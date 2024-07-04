import React, { useContext, useEffect, useState } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext';
import Item from '../Components/Item/Item'

const ShopCategory = (props) => {
  const {all_product} = useContext(ShopContext);
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    // Fetch new arrivals or filter based on your logic
    const newProducts = all_product.filter((item) =>
      item.category.startsWith(props.category)
    );
    setNewArrivals(newProducts.slice(0, 4)); 
  }, [all_product, props.category]);

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
      <h2>New Arrivals</h2>
      <hr/>
        <div className='shopcategory-products'>
          {newArrivals.map((item, i) => (
            <div key={i} className='shopcategory-product-item'>
              <Item
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default ShopCategory