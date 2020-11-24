import React from 'react';
import ProductCatalog from '../ProductCatalog/productCatalog.js';

function Home({search}){

    return (
    <div>
        <ProductCatalog sale={false} search={search}/>
        <ProductCatalog sale={true} search={search}/>
    </div>  
    
    )
}
export default Home;