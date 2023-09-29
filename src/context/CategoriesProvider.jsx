import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import clientAxios from "../config/axios";

const CategoriesContext = createContext();

const CategoriesProvider = ({ children }) => {
  // Loader
  const [loader, setLoader] = useState(true);
  // Array of categories
  const [categories, setCategories] = useState([]);
  // Category to edit
  const [category, setCategory] = useState({});

  // Navigate
  const navigate = useNavigate();

  const setEdition = (categoryObject) => {
    setCategory(categoryObject);
  };

  // Load categories
  useEffect(() => {
    const chargeCategories = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoader(false);
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await clientAxios("category", config);
        setCategories(data);
      } catch (error) {
        console.log(error.response.data.msg);
      }
      setLoader(false);
    };
    chargeCategories();

  }, []);

  // Create a new category
  const addCategory = async (category) => {
    const token = localStorage.getItem("token");
    // Edit category
    if (!token) {
      return;
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    if (category._id) {
      try {

        const { data } = await clientAxios.put(
          `/category/${category._id}`,
          category,
          config
        );
        const categoriesUpdated = categories.map( categoryState => categoryState._id === data._id ? data :categoryState);
        setCategories(categoriesUpdated);
        return { msg: "Categoria editada correctamente", isError: false };
      } catch (error) {
        console.log(error);
        return { msg: error.response.data.msg, isError: true };
      }
    // Add category
    } else {
      try {
    
        const { data } = await clientAxios.post(
          "/category",
          category,
          config
        );
        setCategories([...categories, data]);
        return { msg: "Categoria agregada correctamente", isError: false };
      } catch (error) {
        console.log(error);
        return { msg: error.response.data.msg, isError: true };
      }
    }
  };

  // Eliminate category
  const eliminateCategory = async (id) =>{
      try {
        const token = localStorage.getItem("token");
        // Delete category
        if (!token) {
          return;
        }
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };  

        const { data } = await clientAxios.delete(
          `/category/${id}`, config
        );
        const categoryDeleted = categories.filter( categoryState => categoryState._id !== id);
        setCategories(categoryDeleted);
        return { msg: "Categoria eliminada correctamente", isError: false };
      } catch (error) {
        console.log(error);
        return { msg: error.response.data.msg, isError: true };
      }
    };      
  return (
    <CategoriesContext.Provider
      value={{
        loader,
        categories,
        category,
        setCategory,
        addCategory,
        eliminateCategory,
        setEdition,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export { CategoriesProvider };

export default CategoriesContext;
