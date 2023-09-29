import { createContext, useState, useEffect } from "react";
import clientAxios from "../config/axios";

const MealsContext = createContext();

const MealsProvider = ({ children }) => {
  // Loader
  const [loaderMeals, setLoaderMeals] = useState(true);
  // Array of meals
  const [meals, setMeals] = useState([]);
  // Category to edit
  const [meal, setMeal] = useState({});
  // Modal to eliminate
  const [modalDelete, setModalDelete] = useState({});

  const setEdition = (mealObject) => {
    setMeal(mealObject);
  };

  // Load meals
  useEffect(() => {
    const loadMeals = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoaderMeals(false);
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await clientAxios("/meals", config);
        setMeals(data);
      } catch (error) {
        console.log(error.response.data.msg);
      }
      setLoaderMeals(false);
    };
    loadMeals();
  }, []);

  // Create a new category
  const createMeal = async (meal) => {
    const formData = new FormData();
    const token = localStorage.getItem("token");
    // Edit category
    if (!token) {
      return;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    if (meal._id) {
      try {
        for (const key in meal) {
          formData.append(key, meal[key]);
        }

        const { data } = await clientAxios.put(
          `/meals/${meal._id}`,
          formData,
          config
        );
        const mealsUpdate = meals.map((mealState) =>
          mealState._id === data._id ? data : mealState
        );
        setMeals(mealsUpdate);
        return { msg: "Platillo editado correctamente", isError: false };
      } catch (error) {
        console.log(error);
        return { msg: error.response.data.msg, isError: true };
      }
      // Add category
    } else {
      try {
        for (const key in meal) {
          formData.append(key, meal[key]);
        }

        const { data } = await clientAxios.post("/meals", formData, config);
        console.log(data);
        setMeals([...meals, data]);
        return { msg: "Platillo agregado correctamente", isError: false };
      } catch (error) {
        console.log(error);
        return { msg: error.response.data.msg, isError: true };
      }
    }
  };

  // Eliminate platillo
     const eliminateMeal = async (id) =>{
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
             `/meals/${id}`, config
           );
           const mealDeleted = meals.filter( mealState => mealState._id !== id);
           setMeals(mealDeleted);
           return { msg: "Platillo eliminado correctamente", isError: false };
         } catch (error) {
           console.log(error);
           return { msg: error.response.data.msg, isError: true };
         }
       };
  return (
    <MealsContext.Provider
      value={{
        meal,
        setMeal,
        loaderMeals,
        meals,
        createMeal,
        eliminateMeal,
        setEdition,
        modalDelete, 
        setModalDelete
      }}
    >
      {children}
    </MealsContext.Provider>
  );
};

export { MealsProvider };

export default MealsContext;
