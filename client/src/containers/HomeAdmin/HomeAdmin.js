import React from 'react';
import ProductCatalog from '../ProductCatalog/productCatalog.js';

function HomeAdmin(){

    return ( // AGREGAR SIDEBAR MENU.
    <div>
        <ProductCatalog admin={true}/>
    </div>  
    
    )
}
export default HomeAdmin;