import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Stars from "./Stars";
import "./Review.css";
import axios from "axios";

const Review = ({ id }) => {
  const [review, setReview] = useState([]);
  const history = useHistory();

  const handleBack = () => {
    history.push(`/`);
  };

  const handleClickReview = async (id) => {
    try {
      await axios.put(`${process.env.REACT_APP_API}/orders/${id}`, review);
      alert("¡Muchas gracias por tus comentarios!")
      history.push(`/`);
    } catch (error) {
      alert("Hubo un error. Por favor, intentá de nuevo.")
    }
  };

  const handleOnChange = (e) => {
    setReview({
      ...review,
      [e.target.name]: e.target.value,
    });
  };

  const handleReview = (hearts) => {
    setReview({
      ...review,
      rating: hearts,
    });
  };

  return (
    <>
      <div className="back" onClick={handleBack}>
        Volver
      </div>
      <div className="review-container">
        <div className="container-summary">
          <div className="title-container-summary">
            Calificá tu experiencia:{" "}
          </div>
          <div className="stars-small" name="rating" onChange={handleOnChange}>
            {" "}
            <Stars setReview={handleReview} />{" "}
          </div>

          <textarea
            className="comments"
            name="review"
            onChange={handleOnChange}
            placeholder="Dejanos tu comentario:"
          ></textarea>
        </div>
      </div>

      <div className="review-button">
        <div className="calificar" onClick={() => handleClickReview(id)}>
          Calificar
        </div>
      </div>
    </>
  );
};

export default Review;
