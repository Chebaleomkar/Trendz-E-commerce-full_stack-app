import "./Products.scss";
import Product from './Product/Product'



const Products = ({innerPage , headingText , products }) => {

    return (
     <div className="products-container">
       { !innerPage && <div className="sec-heading"> {headingText} </div>}
         <div className="products">
          {
            products?.data?.map((item ,i )=>(
              <Product data={item.attributes} key={i} id={item.id} />
              ))
            }
      
           
         </div>
     </div>
    )
};

export default Products;
