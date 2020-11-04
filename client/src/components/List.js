import React from 'react';
import Item from './item';

function List(props){
    return(
        <div className="list">
            {
                props.artiulos.map(item=>
                    <Articulo 
                        key={artiulos.id}
                        title={artiulos.title}
                        description={artiulos.description}
                        price={artiulos.price}
                        image={artiulos.image} />
                )
            }
        </div>
    );
}

export default List;