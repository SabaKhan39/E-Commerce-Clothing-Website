import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

const AddProduct = () => {
    
const [image, setImage] = useState(false);
const [productDetails, setProductDetails] = useState({
    name: "",
    image:"",
    category:"women",
    new_price:"",
    old_price:"",
    color: '',  
    size: '',   
    offer: '',  
    available: true,
});

const imageHandler = (e) =>{
    setImage(e.target.files[0]);
}
const changeHandler = (e) => {
    setProductDetails({...productDetails, [e.target.name]: e.target.value});
}

const Add_Product = async () => {
    console.log(productDetails);
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append('product', image);

    await fetch('http://localhost:4000/upload',{
        method: 'POST',
        headers:{
            Accept:'application/json',
        },
        body:formData, 
    }).then((resp) => resp.json()).then((data)=>{responseData = data});

    if(responseData.success)
        {
            product.image = responseData.image_url;
            console.log(product);
            await fetch('http://localhost:4000/addproduct',{
                method: 'POST',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(product),
            }).then((resp) => resp.json()).then((data)=>{
                data.success?alert("Product Added"):alert("Failed to Add Product!")
           })
        }
}


  return (
    <div className='add-product'>
        <div className="addproduct-itemfield">
            <p>Product Title</p>
            <input value={productDetails.name} onChange={changeHandler} type="text" name="name" placeholder='Type Here..'/>
        </div>
        <div className="addproduct-price">
            <div className="addproduct-itemfield">
                <p>Price</p>
                <input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder='Type Here...'/>
            </div>
            <div className="addproduct-itemfield">
                <p>Offer Price</p>
                <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder='Type Here...'/>
            </div>
        </div>
        <div className="addproduct-itemfield">
            <p>Product Category</p>
            <select  value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="kids">Kids</option>
                <option value="shirts">Shirts</option>
                <option value="tshirts">T-Shirts</option>
                <option value="sweatshirts">Sweatshirts</option>
                <option value="jackets">Jackets</option>
                <option value="jeans">Jeans</option>
                <option value="kurta">Kurta</option>
                <option value="watches">Watches</option>
                <option value="shoes">Shoes</option>
                <option value="tops">Tops</option>
                <option value="bottoms">Bottoms</option>
                <option value="blazer">Blazer</option>
                <option value="dress">Dress</option>
                <option value="kurtaset">Kurta Set</option>
                <option value="saree">Saree</option>
                <option value="gowns">Gowns</option>
                <option value="sandals">Sandals</option>
                <option value="cosmetics">Cosmetics</option>
                <option value="g_tops">G_Tops</option>
                <option value="g_bottoms">G_Bottom</option>
                <option value="g_dresses">G_Dress</option>
                <option value="g_ethnic_wear">G_Ethnic</option>
                <option value="g_sandals">G_Sandals</option>
                <option value="b_shirts">B_Shirts</option>
                <option value="b_tshirts">B_T-Shirts</option>
                <option value="b_jeans">B_Jeans</option>
                <option value="b_ethnic_wear">B_Ethnic</option>
                <option value="b_shoes">B_Shoes</option>
            </select>
        </div>

        <div className="addproduct-itemfield">
        <p>Color</p>
        <input value={productDetails.color} onChange={changeHandler} type='text' name='color' placeholder='Type Here...' />
      </div>
      <div className='addproduct-itemfield'>
        <p>Size</p>
        <input value={productDetails.size} onChange={changeHandler} type='text' name='size' placeholder='Type Here...' />
      </div>
      <div className='addproduct-itemfield'>
        <p>Offer</p>
        <input value={productDetails.offer} onChange={changeHandler} type='text' name='offer' placeholder='Type Here...' />
      </div>
      <div className='addproduct-itemfield'>
            <label htmlFor="file-input">
                <img src={image ? URL.createObjectURL(image):upload_area} className='addproduct-thumbnail-img' alt="" />
            </label>
            <input onChange= {imageHandler} type="file" name='image' id='file-input' hidden/>
        </div>
        <button onClick={()=>{Add_Product()}} className='addproduct-btn'>ADD</button>
    </div>
  )
}

export default AddProduct