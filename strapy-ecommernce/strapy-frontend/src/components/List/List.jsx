import React from "react";
import Cards from "../Cards/Cards";
import "./List.scss";
// import useFetch from "../../hooks/useFetch";

const List = ({ subCats, maxPrice, sort, catId }) => {
  const [data, setData] = React.useState("");
  const [loading, setLoading] = React.useState("");
  //   const {  loading, error } = useFetch(
  //     `/products?populate=*&[filters][categories][id]=${catId}${subCats.map(
  //       (item) => `&[filters][sub_categories][id][$eq]=${item}`
  //     )}&[filters][price][$lte]=${maxPrice}&sort=price:${sort}`
  //   );

  return (
    <div className="list">
      {loading
        ? "loading"
        : data?.map((item) => <Cards item={item} key={item.id} />)}
    </div>
  );
};

export default List;
