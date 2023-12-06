import "./Home.scss";
import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import Products from "../Products/Products";
import { useEffect, useCallback, useState } from "react";
import { fetchDataFromApi } from "../../utils/api";
import { useContext } from "react";
import { Context } from "../../utils/Context";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Home = () => {
  const { categories, setCategories, products, setProducts } = useContext(Context);
  const [showPopUp, setShowPopUp] = useState(false);

  const getCategories = useCallback(() => {
    fetchDataFromApi("/api/categories?populate=*").then((res) => {
      setCategories(res);
    });
  }, [setCategories]);

  const getProducts = useCallback(() => {
    fetchDataFromApi("/api/products?populate=*").then((res) => {
      setProducts(res);
    });
  }, []);

  useEffect(() => {
    getCategories();
    getProducts();

    // Check if the popup has been shown before
    const popupShownBefore = sessionStorage.getItem('popupShownBefore');

    if (!popupShownBefore) {
      setShowPopUp(true);
      sessionStorage.setItem('popupShownBefore', 'true');
    }

  }, [getCategories, getProducts]);

 

  return (
    <div>
      <Banner />
      <div className="main-content">
        <div className="layout">
          {showPopUp && (
            <Popup
              open={showPopUp}
              closeOnDocumentClick
              onClose={() => setShowPopUp(false)}
              modal
            >
              <div className="popup-content" style={{backgroundColor : 'white' , width : '100%' , height : '200px',  fontFamily : 'bold' }}>
               
              <div style={{marginTop :'20px' }}>
                <h3 style={{color : 'darkred' , fontFamily : 'bold'}}>Please fill you email Notify about Products and Offers </h3>
                 <h5 style={{color : 'red' , fontFamily : 'bold'}} > The receipts of the orders will be delievered to email </h5>

              </div>
              <div style={{marginTop : '50px'}}>
                 <button style={{marginLeft : '30%' , fontSize : '20px' , width : '60px' }} onClick={()=>setShowPopUp(false)} > Ok </button>
                 <button style={{marginLeft : '30%' , fontSize:'20px' , width : '60px'}} onClick={() => setShowPopUp(false)}>Close</button>
              </div>

              </div>
            </Popup>
          )}
          <Category categories={categories} />
          <Products products={products} headingText="popular Products " />
        </div>
      </div>
    </div>
  );
};

export default Home;
