import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviews } from "../../redux/actions/actions";
import ReviewCard from "../../components/ReviewCard/ReviewCard.js";

export default function CategoryTable() {
  const reviews = useSelector((state) => state.reviews);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      dispatch(getReviews());
    })();
  }, [dispatch]);

  return (
    //además deberia mostrar el nombre del producto,precio e imagen
    <div>
      <label>--- Listado de Reviews ---</label>
      <br />
      <br />
      {reviews &&
        reviews.map((review) => <ReviewCard review={review} key={review.id} />)}
    </div>
  );
}
