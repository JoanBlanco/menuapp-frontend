import { useContext } from "react";
import CategoriesContext from "../context/CategoriesProvider";

const useCategory = () => {
    return useContext(CategoriesContext);
}

export default useCategory;