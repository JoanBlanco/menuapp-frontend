import { createContext, useState, useEffect } from "react";
import clientAxios from "../config/axios";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  // Loader
  const [loader, setLoader] = useState(true);
  // Array of users
  const [users, setUsers] = useState([]);
  // Rols
  const [rols, setRols] = useState([]);
  // Category to edit
  const [user, setUser] = useState({});

  const setEdition = (userObject) => {
    setUser(userObject);
  };

  // Load users
  useEffect(() => {
    const chargeUsers = async () => {
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
        const { data } = await clientAxios("user", config);
        setUsers(data);
      } catch (error) {
        console.log(error.response.data.msg);
      }
      setLoader(false);
    };
    chargeUsers();

    const chargeRols = async () => {
      const token = localStorage.getItem("token");

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
        const { data } = await clientAxios("rol", config);
        setRols(data);
      } catch (error) {
        console.log(error.response.data.msg);
      }
    };
    chargeRols();
  }, []);

  // Create a new user
  const addUser = async (user) => {
    const token = localStorage.getItem("token");
    // Edit user
    if (!token) {
      return;
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    if (user._id) {
      try {
        const { data } = await clientAxios.put(
          `/user/${user._id}`,
          user,
          config
        );
        const userUpdated = users.map((userState) =>
          userState._id === data._id ? data : userState
        );
        setUsers(userUpdated);
        return { msg: "Usuario editado correctamente", isError: false };
      } catch (error) {
        console.log(error);
        return { msg: error.response.data.msg, isError: true };
      }
      //  Add user
    } else {
      try {
        const { data } = await clientAxios.post("/user", user, config);
        setUsers([...users, data]);
        return { msg: "Usuario agregado correctamente", isError: false };
      } catch (error) {
        console.log(error);
        return { msg: error.response.data.msg, isError: true };
      }
    }
  };

     // Eliminate user
     const eliminateUser = async (id) => {
       try {
         const token = localStorage.getItem("token");
         // Delete user
         if (!token) {
           return;
         }
         const config = {
           headers: {
             "Content-Type": "application/json",
             Authorization: `Bearer ${token}`,
           },
         };

         const { data } = await clientAxios.delete(`/user/${id}`, config);
         const userDeleted = users.filter(
           (userState) => userState._id !== id
         );
         setUsers(userDeleted);
         return { msg: "Categoria eliminada correctamente", isError: false };
       } catch (error) {
         console.log(error);
         return { msg: error.response.data.msg, isError: true };
       }
     };
  return (
    <UserContext.Provider
      value={{
        loader,
        users,
        rols,
        user,
        setUser,
        addUser,
        eliminateUser,
        setEdition,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };

export default UserContext;
