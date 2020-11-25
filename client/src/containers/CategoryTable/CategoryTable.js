import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../redux/actions/actions";
import CategoryCard from "../../components/CategoryCard/CategoryCard.js";
import { useHistory } from "react-router-dom";

export default function CategoryTable() {
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleOnClickAddCategory = () => history.push(`/admin/categories/add`);

  useEffect(() => {
    (async () => {
      dispatch(getCategories());
    })();
  }, [dispatch]);

  return (
    //además deberia mostrar el nombre del producto,precio e imagen
    <div>
      <div
        className="product-catalog-button"
        onClick={handleOnClickAddCategory}
      >
        Agregar Categoría
      </div>
      <br />
      <label>--- Listado de categorías ---</label>
      <br />
      <br />
      {categories &&
        categories.map((category) => (
          <CategoryCard category={category} key={category.createdAt} />
        ))}
    </div>
  );
}
