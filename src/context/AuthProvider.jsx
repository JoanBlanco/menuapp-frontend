import { createContext, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import clientAxios from "../config/axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // REGEX
  const EMAIL_REGEX = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  const PASSWORD_REGEX = new RegExp(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
  );
  // Notification
  const [notification, setNotification] = useState(null);
  // Auth
  const [auth, setAuth] = useState({});
  // Modal state
  const [modalDelete, setModalDelete] = useState({});
  // Loader
  const [loader, setLoader] = useState(true);
  // Rol user
  const [userRol, setUserRol] = useState({});
  // Button to activate sidebar
  const [activeSidebar, setActiveSidebar] = useState(false);
  // NAVIGATE
  const navigate = useNavigate();

  // Auth user
  useEffect(() => {
    const authUser = async () => {
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
        const { data } = await clientAxios("admin/profile", config);
        setAuth(data);
        setUserRol(data?.rol);
      } catch (error) {
        console.log(error.response.data.msg);
        setAuth({});
        setUserRol(null);
      }
      setLoader(false);
    };
    authUser();
  }, []);

  // Login
  const loginUser = async (user) => {
    try {
      const { data } = await clientAxios.post("/admin/login", user);
      localStorage.setItem("token", data.token);
      setAuth(data);
      setUserRol(data.rol);
      if (data.rol.nameRol === "admin") navigate("/admin");
      if (data.rol.nameRol === "mesonero") navigate("/user");
      if (data.rol.nameRol === "cocina") navigate("/kitchen-orders");
      if (data.rol.nameRol === "caja") navigate("/caja-orders");
      return { msg: "Ingreso correctamente", isError: false };
    } catch (error) {
      console.log(error);
      return { msg: error.response.data.msg, isError: true };
    }
  };
  // Function to create a new user
  const registerUser = async (user) => {
    try {
      const { data } = await clientAxios.post("/admin", user);
      return { msg: data.msg, isError: false };
    } catch (error) {
      console.log(error);
      return { msg: error.response.data.msg, isError: true };
    }
  };

  // Send email to recove password
  const sendEmailPassword = async (email) => {
    try {
      const { data } = await clientAxios.post("/admin/forgot-password", {
        email,
      });
      return { msg: data.msg, isError: false };
    } catch (error) {
      console.log(error);
      return { msg: error.response.data.msg, isError: true };
    }
  };

  // Recove Password
  const changePassword = async ({ password, token }) => {
    try {
      const { data } = await clientAxios.post(
        `/admin/forgot-password/${token}`,
        { password }
      );
      return { msg: data.msg, isError: false };
    } catch (error) {
      console.log(error);
      return { msg: error.response.data.msg, isError: true };
    }
  };

  // Close session
  const closeSession = () => {
    localStorage.removeItem("token");
    setAuth({});
  };
  return (
    <AuthContext.Provider
      value={{
        auth,
        userRol,
        navigate,
        activeSidebar,
        setActiveSidebar,
        loader,
        EMAIL_REGEX,
        PASSWORD_REGEX,
        notification,
        setNotification,
        registerUser,
        sendEmailPassword,
        changePassword,
        loginUser,
        closeSession,
        modalDelete,
        setModalDelete,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
