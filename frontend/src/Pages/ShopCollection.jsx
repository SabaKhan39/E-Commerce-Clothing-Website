import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import Item from '../Components/Item/Item';
import './CSS/ShopCollection.css';

const ShopCollection = () => {
  const { category } = useParams();
  const { all_product } = useContext(ShopContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    color: '',
    size: '',
    offer: ''
  });

  useEffect(() => {
    console.log(`Filtering products for category: ${category}`);
    console.log('Filters:', filters);
    const filtered = all_product.filter(item => 
      item.category === category &&
      (filters.color === '' || item.color === filters.color) &&
      (filters.size === '' || item.size === filters.size) &&
      checkOfferRange(item.offer, filters.offer)
    );
    console.log('Filtered products:', filtered);
    setFilteredProducts(filtered);
  }, [all_product, category, filters]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const checkOfferRange = (offer, selectedRange) => {
    if (!selectedRange) {
      return true; // If no range selected, accept all offers
    }

    const rangeParts = selectedRange.split('-');
    if (rangeParts.length !== 2) {
      console.error('Invalid selectedRange format:', selectedRange);
      return false; // Handle the error as needed
    }

    const [lowerBound, upperBound] = rangeParts.map(Number);
    const numericOffer = Number(offer);

    if (isNaN(numericOffer)) {
      console.error('Invalid offer value:', offer);
      return false; // Handle the error as needed
    }

    return numericOffer >= lowerBound && numericOffer <= upperBound;
  };


  return (
    <div className='shop-collection'>
      <div className="filters">
        <h2>Filters</h2>
        <div className="filter-section">
          <h3>Colors</h3>
          <select name="color" onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="Black">Black</option>
            <option value="White">White</option>
            <option value="Grey">Grey</option>
            <option value="Silver">Silver</option>
            <option value="Golden">Golden</option>
            <option value="Beige">Beige</option>
            <option value="Brown">Brown</option>
            <option value="Red">Red</option>
            <option value="Orange">Orange</option>
            <option value="Yellow">Yellow</option>
            <option value="Cream">Cream</option>
            <option value="Green">Green</option>
            <option value="Teal">Teal</option>
            <option value="Blue">Blue</option>
            <option value="Purple">Purple</option>
            <option value="Pink">Pink</option>
            <option value="Multi-color">Multi-color</option>
          </select>
        </div>
        <div className="filter-section">
          <h3>Sizes</h3>
          <select name="size" onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </div>
        <div className="filter-section">
          <h3>Offers</h3>
          <select name="offer" onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="0-25">0% to 25%</option>
            <option value="25-65">25% to 65%</option>
            <option value="65-85">65% to 85%</option>
          </select>
        </div>
      </div>
      <div className="products">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item, i) => (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default ShopCollection;
