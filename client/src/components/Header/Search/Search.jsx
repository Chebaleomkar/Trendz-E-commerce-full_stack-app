import "./Search.scss";
import { MdClose } from "react-icons/md";
import prod from '../../../assets/products/earbuds-prod-1.webp'
import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import useFetch from './../../../hooks/Fetch';

const Search = ( {setShowSearch}) => {
    const [query  , setQuery] = useState('')
    const navigate = useNavigate();

    let {data} = useFetch(`/api/products?populate=*&filters[title][$contains]=${query}`);
   
    if (!query.length) {
        data = null;
    }
    return (
     <div className="search-modal">
        <div className="form-field">
            <input value={query} onChange={(e)=>setQuery(e.target.value)} type="text" autoFocus placeholder="Search for product"  />
            <MdClose className="close-btn" onClick={()=>setShowSearch(false)} />
        </div>

        <div className="search-result-content">
            <div className="search-results">
                {data?.data?.map(item =>(

                    <div key={item.id} className="search-result-item" onClick={()=>{ navigate(`/product/`+item.id) ; setShowSearch(false) }} >
                         <div className="img-container">
                            <img src={process.env.REACT_APP_DEV_URL +  item?.attributes?.img?.data?.[0]?.attributes?.url } alt="Img" />
                         </div>
                         <div className="prod-details">
                            <span className="name">{item.attributes.title  || 'product name'} </span>
                            <span className="desc">{ item.attributes.desc || 'product description'} </span>
                         </div>
                    </div>
                ))}
                </div>
        </div>
     </div>
    )
};

export default Search;
