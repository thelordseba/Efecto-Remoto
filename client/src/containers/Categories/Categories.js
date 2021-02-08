import React, { useEffect } from "react";
import CategoryItem from "./CategoryItem";
import * as actions from "../../redux/actions/actions.js";
import "./categories.css";
import { useDispatch, useSelector } from "react-redux";
import allImage from "./All.png";
const categoriesPhotos = {
  0: allImage,
  2: "https://concepto.de/wp-content/uploads/2018/09/educacion-concepto-e1536242687832.jpg",
  4: "https://www.nutricionalbertogutierrez.es/wp-content/uploads/2019/03/dieta-web.jpg",
  3: "https://www.proneosports.com/wp-content/uploads/2019/05/Industrial-deportiva-1240x620.jpg",
  1: "https://designificado.com/wp-content/uploads/2017/10/comunidad-992x744.jpg",
};
function Categories() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      dispatch(actions.getCategories());
    })();
  }, [dispatch]);

  const categories = useSelector((state) => state.categories);

  return (
    <>
      <div className="titulo-cat">
        <h1> </h1>
      </div>
      <div className="con-cot-cat">
        {categories?.length &&
          categories.map((cat) => {
            return (
              <CategoryItem
                key={cat.id}
                id={cat.id}
                titulo={cat.name}
                photo={categoriesPhotos[cat.id]}
              />
            );
          })}
        <div className="cat-all">
          <CategoryItem
            key={0}
            id={0}
            titulo={"Todos los productos"}
            photo={categoriesPhotos[0]}
          />
        </div>
      </div>
    </>
  );
}
export default Categories;
