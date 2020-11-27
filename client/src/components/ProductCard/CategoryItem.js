import React from 'react'

function CategoryItem({id, titulo, photo}){
console.log("titulo" ,titulo)
    return (
        <div
        className="cat-cnt-css"
        style={{  position: 'relative',
            display: 'grid',
            'border-radius': '5px',
            'margin-bottom': '8px',
            'background-color': '#fff',
            'box-shadow': '0 0 0.125rem #c3c3c3',
            'transition-duration': '250ms',
            'background-position': 'center center',
	        'background-size': 'cover',
	        backgroundRepeat: 'no-repeat',
            overflow: 'hidden',
            backgroundImage: `url(${photo})`,
            height: '300px'}}
      >
        <div className="product-card-content">
          <a href={`/products?category=${id}`}>
            <div className="title-categor">{titulo}</div>
          </a>
        </div>
        <div></div>
      </div>
  )
}
   
    export default CategoryItem