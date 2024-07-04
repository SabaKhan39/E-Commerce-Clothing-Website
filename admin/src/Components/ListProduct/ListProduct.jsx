import React, { useState, useEffect } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'

const ListProduct = () => {
    const [allproducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const fetchInfo = async () => {
        await fetch('http://localhost:4000/allproducts')
        .then((res)=>res.json())
        .then((data)=>{
            setAllProducts(data)
            setFilteredProducts(data);
        });
    }

    useEffect(() => {
        fetchInfo();
      }, []);

    const remove_product = async (id) =>  {
        await fetch('http://localhost:4000/removeproduct',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id:id})
        })
        await fetchInfo();
    }

    const handleCategoryChange = (category) => {
        if (category === 'All') {
            setFilteredProducts(allproducts); // Show all products
        } else {
            const filtered = allproducts.filter((product) => product.category === category);
            setFilteredProducts(filtered);
        }
    };

  return (
    <div className='list-product'>
        <h1>All Products List</h1>
        <div className="listproduct-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Old Price</p>
            <p>New Price</p>
            <p>Category</p>
            <p>Color</p> 
            <p>Size</p>  
            <p>Offers</p>
            <p>Remove</p>
        </div>
        <div className="listproduct-allproducts">
            <hr />
            {filteredProducts.map((product, index) =>{
                return <>
                <div key={index} className="listproduct-format-main listproduct-format" >
                    <img src={product.image} alt="" className="listproduct-product-icon" />
                    <p>{product.name}</p>
                    <p>₹{product.old_price}</p>
                    <p>₹{product.new_price}</p>
                    <p>{product.category}</p>
                    <p>{product.color}</p> 
                    <p>{product.size}</p> 
                    <p>{product.offer}</p>
                    <img onClick={() => { remove_product(product.id) }} className="listproduct-remove-icon" src={cross_icon} alt="" />
                </div>
                <hr />
                </>
            })}
        </div>
    </div>
  )
}

export default ListProduct