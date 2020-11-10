import React from 'react';
import ProductCatalog from '../ProductCatalog/productCatalog.js';

function Home({search}){

    return (
    <div>
        <ProductCatalog search={search}/>
    </div>  
    
    )
}
export default Home;