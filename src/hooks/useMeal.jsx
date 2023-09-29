import { useContext } from "react";
import MealsContext from "../context/MealsProvider";

const useMeal = () => {
    return useContext(MealsContext);
}

export default useMeal;