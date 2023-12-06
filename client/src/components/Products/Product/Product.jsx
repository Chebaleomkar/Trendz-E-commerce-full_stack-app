// Product.jsx
import './Product.scss'
import prod from '../../../assets/products/dummyprod.jpeg'
import { useNavigate } from 'react-router-dom';


const Product = ({ data,  id }) => {
  const navigate= useNavigate();
  
    
    const imageUrl = 'http://localhost:1337' + data?.img?.data?.[0]?.attributes?.url || prod;
   

    return (
        <div className="product-card" onClick={()=>navigate( `/product/`+id) }>
        <div className="thumbnail">
          <img src={ imageUrl || prod  } alt="productIMG" />
        </div>
        <div className="prod-details">
          <span className="name">{data?.title || 'Unknown Product'}</span>
          <span className="price">&#8377;{data?.price || 'N/A'}</span>
        </div>
      </div>
    );
  };

export default Product;