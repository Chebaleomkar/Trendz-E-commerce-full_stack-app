import React from "react";
import "./Category.scss";
import { useNavigate } from "react-router-dom";

import cat1 from "../../../assets/category/cat-1.jpg";


const Category = ({ categories }) => {

  const navigate = useNavigate();

  return (
    <div className="shop-by-category">
      <div className="categories">
        {categories?.data?.map((item, index) => (
          <div key={index} className="category" onClick={()=>navigate(`/category/${item.id}`) }>
            <img
              src={process.env.REACT_APP_DEV_URL + item.attributes.img.data[0].attributes.url}
              alt="img"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
