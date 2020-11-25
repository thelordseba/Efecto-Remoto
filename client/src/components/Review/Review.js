import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import Stars from "./Stars";
import "./Review.css";
import axios from "axios";

const Review = ({id}) => {

  const [review, setReview] = useState([]);  
  const history = useHistory();
 

  const handleBack = () => {
    //Poner la ruta a donde volver
    //history.push(``);
  };
  
  const handleClickReview = async (id) => {      
      try{
        await axios.put(`http://localhost:3001/orders/${id}`, review)
      }catch(error){  
          console.log(error);
      }      
  };

  const handleOnChange = (e)=>{
      setReview({
          ...review,
          [e.target.name]: e.target.value
      })
  }

  const handleReview = (hearts)=>{      
      setReview({
          ...review,
          rating: hearts
      })
  }

  return (
    <>
      <div className="back" onClick={handleBack}>
        Volver
      </div>
      <div className="review-container">
        <div className="container-summary">
          <div className="title-container-summary">Califica tu experiencia: </div>
          <div className="stars-small" name="rating" onChange={handleOnChange}> <Stars setReview= {handleReview} /> </div>
        
          <textarea className="coments"  name="review" onChange={handleOnChange} placeholder= "Dejanos tu cometario:"></textarea>

          
        </div>
      </div>   

      <div className="review-button">
        <div className="review" onClick={()=>handleClickReview(id)}>
          Calificar
        </div>
      </div>
    </>
  );
};

export default Review;
