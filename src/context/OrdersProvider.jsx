import { createContext, useState, useEffect } from "react";
import clientAxios from "../config/axios";

const OrdersContext = createContext();

const OrdersProvider = ({ children }) => {
   // Loader
   const [loader, setLoader] = useState(true);
//   // Array of orders
   const [orders, setOrders] = useState([]);
  // Option order
 const [tableId, setTableId] = useState('');
 // Order
 const [order, setOrder] = useState({});
 const [mealsId, setMealsId] = useState('');



  const setEdition = (tableObject) => {
    setTableId(tableObject.tableId);
    setOrder({_id: tableObject._id})
  };

   // Load Orders
    useEffect(() => {
      const chargeOrders = async () => {
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
          const { data } = await clientAxios("orders", config);
          setOrders(data);
          console.log(data);
          // setMealArray(data.meals)
          console.log('Hola');
        } catch (error) {
          console.log(error.response.data.msg);
        }
        setLoader(false);
      };
      chargeOrders();
    }, []);

   //Create a new order
    const addOrder = async (orderObject) => {
     const token = localStorage.getItem("token");
      // Edit orderObject
     if (!token) {
       return;
     }
     const config = {
       headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
       },
     };
     if (order?._id || orderObject?._id) {
       try {
         const { data } = await clientAxios.put(
           `/orders/${orderObject?._id}`,
           orderObject,
           config
         );
         const orderUpdated = orders.map((tableState) =>
           tableState._id === data._id ? data : tableState
         );
         setOrders(orderUpdated);
         setOrder({_id: data._id});
         return { msg: "Agregado correctamente", isError: false };
       } catch (error) {
         console.log(error);
         return { msg: error.response.data.msg, isError: true };
       }
       //Add orderObject
     } else {
       try {
         const { data } = await clientAxios.post("/orders", orderObject, config);
         setOrders([...orders, data]);
         setOrder({_id: data._id});
        console.log(data.meals);
         return { msg: "Pedido creado correctamente", isError: false };
       } catch (error) {
         console.log(error);
         return { msg: error.response.data.msg, isError: true };
       }
     }
   };

  //   Eliminate order
    const eliminateOrder = async (id) => {
      try {
        const token = localStorage.getItem("token");
       //  Delete order
        if (!token) {
          return;
        }
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await clientAxios.delete(`/orders/order/${id}`, config);
        const orderDeleted = orders.filter(
          (orderState) => orderState._id !== id
        );
        setOrders(orderDeleted);
        alert("Pedido eliminado correctamente")
        return { msg: "Pedido eliminado correctamente", isError: false };
      } catch (error) {
        console.log(error);
        alert(error.response.data.msg)
       return { msg: error.response.data.msg, isError: true };
     }
   };

   const eliminateOneMeal = async (mealObject) => {
      try {
        const token = localStorage.getItem("token");
       //  Delete order
        if (!token) {
          return;
        }
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await clientAxios.put(`/orders/deleteOne/${mealObject._id}`, mealObject, config);
        const orderUpdated = orders.map((tableState) =>
           tableState._id === data._id ? data : tableState
         );
        setOrders(orderUpdated);
        return { msg: "Se ha eliminado correctamente", isError: false };
      } catch (error) {
        console.log(error);
       return { msg: error.response.data.msg, isError: true };
     }
   };

   const checkOrder = async (orderObject) => {
    const token = localStorage.getItem("token");
      // Edit orderObject
     if (!token) {
       return;
     }
     const config = {
       headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
       },
     };
 
       try {
         const { data } = await clientAxios.put(
           `/orders/check/${orderObject?._id}`,
           orderObject,
           config
         );
         const orderUpdated = orders.map((tableState) =>
           tableState._id === data._id ? data : tableState
         );
         setOrders(orderUpdated);
         return { msg: "Checkeado correctamente", isError: false };
       } catch (error) {
         console.log(error);
         return { msg: error.response.data.msg, isError: true };
       }
   }

   const finishOrder = async (_id) => {
    const token = localStorage.getItem("token");
      // Edit orderObject
     if (!token) {
       return;
     }
     const config = {
       headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
       },
     };
 
       try {
         const { data } = await clientAxios.put(
           `/orders/finish/${_id}`, {_id},
           config
         );
         const orderUpdated = orders.map((tableState) =>
           tableState._id === data._id ? data : tableState
         );
         setOrders(orderUpdated);
         return { msg: "Pedido finalizado", isError: false };
       } catch (error) {
         console.log(error);
         return { msg: error.response.data.msg, isError: true };
       }
   }

   const payOrder = async (orderObject) => {
    const token = localStorage.getItem("token");
      // Edit orderObject
     if (!token) {
       return;
     }
     const config = {
       headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
       },
     };
 
       try {
         const { data } = await clientAxios.put(
           `/orders/pay/${orderObject._id}`, orderObject,
           config
         );
         const orderUpdated = orders.map((tableState) =>
           tableState._id === data._id ? data : tableState
         );
         setOrders(orderUpdated);
         return { msg: "Pago exitoso", isError: false };
       } catch (error) {
         console.log(error);
         return { msg: error.response.data.msg, isError: true };
       }
   }
   
  return (
    <OrdersContext.Provider
      value={{
        // loader,
        order,
        orders,
        setOrders,
        tableId,
        setTableId,
        mealsId,
        setMealsId,
        addOrder,
        eliminateOrder,
        eliminateOneMeal,
        checkOrder,
        finishOrder,
        setOrder,
        payOrder,
       setEdition,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export { OrdersProvider };

export default OrdersContext;
