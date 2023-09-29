import { useContext } from "react";
import OrdersContext from "../context/OrdersProvider";

const useOrder = () => {
    return useContext(OrdersContext);
}

export default useOrder;