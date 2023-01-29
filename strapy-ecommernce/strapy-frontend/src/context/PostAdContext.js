import React from "react";
import { createContext, useContext } from "react";
const FormContext = createContext({
  category: "",
  setCategory: null,
  region: "",
  setRegion: null,
  categories: "",
  setCategories: null,
  imageList: [],
  setImageList: null,
  productName: "",
  setProductName: null,
});

export function UseContextProvider({ children }) {
  const [category, setCategory] = React.useState("");
  const [region, setRegion] = React.useState("");
  const [categories, setCategories] = React.useState("");
  const [imageList, setImageList] = React.useState([]);
  const [productName, setProductName] = React.useState("");

  return (
    <FormContext.Provider
      value={{
        category,
        setCategory,
        region,
        setRegion,
        categories,
        setCategories,
        imageList,
        setImageList,
        productName,
        setProductName,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}
export function useFormContext() {
  const {
    category,
    setCategory,
    region,
    setRegion,
    categories,
    setCategories,
    imageList,
    setImageList,
    productName,
    setProductName,
  } = useContext(FormContext);
  return {
    category,
    setCategory,
    region,
    setRegion,
    categories,
    setCategories,
    imageList,
    setImageList,
    productName,
    setProductName,
  };
}
