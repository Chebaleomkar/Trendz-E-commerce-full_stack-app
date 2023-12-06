import "./SingleProduct.scss";
import RelatedProducts from './RelatedProducts/RelatedProducts'
import {  useParams } from "react-router-dom";
import {
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaLinkedin ,
    FaPinterest ,
    FaCartPlus
} from 'react-icons/fa'
import prod from '../../assets/products/earbuds-prod-2.webp'
import useFetch from './../../hooks/Fetch';
import { useContext, useState } from "react";
import { Context } from "../../utils/Context";

const SingleProduct = () => {

    const { handleAddToCart , cartItems} = useContext(Context)
//   console.log('handleAddcart : =>' , cartItems )

    const [quantity , setQuantity] = useState(1)
    const {id} = useParams();
    const {data}  = useFetch(`/api/products?populate=*&[filters][id]=${id}`)
     if(!data) return;

     const product = data?.data?.[0]?.attributes;
     const imgUrl = process.env.REACT_APP_DEV_URL + product?.img?.data?.[0]?.attributes?.url

    const increment = () =>{
        setQuantity(prevState => prevState + 1)
    }
    const decrement = () =>{
        setQuantity((prevState) => {
            if(prevState === 1) return 1
            return prevState -1;
        })
    }
    return(
     <div className="single-product-main-content">
        <div className="layout">
            <div className="single-product-page">
                <div className="left">
                    <img src={imgUrl } alt="IMG" />
                </div>

                <div className="right"> 
                    <span className="name">{ product.title  || `Product Name`}</span>
                    <span className="price">&#8377;{ product.price || `1599`} </span>
                    <span className="desc"> { product.desc  || `Product description`}</span>

                    <div className="cart-buttons">
                        <div className="quantity-buttons">
                            <span onClick={decrement}>  - </span>
                            <span> {quantity} </span>
                            <span onClick={increment}> + </span>
                        </div>
                        <button className="add-to-cart-button"  onClick={()=>{
                                handleAddToCart(data.data[0] , quantity) ;
                                setQuantity(1);
                            }} >
                            <FaCartPlus />  Add to Cart
                        </button>
                    </div>

                    <span className="divider" />

                    <div className="info-item">
                        <span className="text-bold">Category : <span> {product?.categories?.data?.[0]?.attributes?.title } </span> </span>
                    </div>

                    <div className="info-item">
                        <span className="social-icons">
                            <FaFacebook size={23} />     
                            <FaTwitter size={23}/>
                            <FaInstagram size={23} />
                            <FaLinkedin size={23} />
                            <FaPinterest size={23} />
                        </span>
                    </div>
                </div>
            </div>

            <RelatedProducts productId={id} categoryId={product?.categories?.data?.[0]?.id} />
        </div>
     </div>
    )
};

export default SingleProduct;
