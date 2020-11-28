import React from "react"
import "./CarrouselONGs.css";
import img0 from './images/0.png'
import img1 from './images/1.png'
import img2 from './images/2.png'
import img3 from './images/3.png'
import img4 from './images/4.png'
import img5 from './images/5.png'

function CarrouselONGs() {
  return  (
    <div className='carrousel-container'>  
    <span className='title-ongs'>ONGs que estan generando Efecto Remoto</span>
    <div id="carousel">
    <figure><img src={img0} alt=""/></figure>
    <figure><img src={img1} alt=""/></figure>
    <figure><img src={img2} alt=""/></figure>
    <figure><img src={img3} alt=""/></figure>
    <figure><img src={img4} alt=""/></figure>
    <figure><img src={img5} alt=""/></figure>
</div>
</div>
  )
}
export default CarrouselONGs;
