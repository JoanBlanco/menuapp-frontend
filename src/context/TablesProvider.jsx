import { createContext, useState, useEffect } from "react";
import clientAxios from "../config/axios";

const TablesContext = createContext();

const TablesProvider = ({ children }) => {
  // Loader
  const [loader, setLoader] = useState(true);
  // Array of tables
  const [tables, setTables] = useState([]);
  // Category to edit
  const [table, setTable] = useState({});
  // Modal state
  //     const [modalDelete, setModalDelete] = useState({})

  const setEdition = (tableObject) => {
    setTable(tableObject);
  };

  // Load tables
  useEffect(() => {
    const chargeTables = async () => {
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
        const { data } = await clientAxios("table", config);
        setTables(data);
      } catch (error) {
        console.log(error.response.data.msg);
      }
      setLoader(false);
    };
    chargeTables();
  }, []);

  //Create a new table
  const addTable = async (table) => {
    const token = localStorage.getItem("token");
    //  Edit table
    if (!token) {
      return;
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    if (table._id) {
      try {
        const { data } = await clientAxios.put(
          `/table/${table._id}`,
          table,
          config
        );
        const tableUpdated = tables.map((tableState) =>
          tableState._id === data._id ? data : tableState
        );
        setTables(tableUpdated);
        return { msg: "Categoria editada correctamente", isError: false };
      } catch (error) {
        console.log(error);
        return { msg: error.response.data.msg, isError: true };
      }
      //Add table
    } else {
      try {
        const { data } = await clientAxios.post("/table", table, config);
        setTables([...tables, data]);
        return { msg: "Mesa agregada correctamente", isError: false };
      } catch (error) {
        console.log(error);
        return { msg: error.response.data.msg, isError: true };
      }
    }
  };

  // Eliminate table
  const eliminateTable = async (id) => {
    try {
      const token = localStorage.getItem("token");
      // Delete table
      if (!token) {
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.delete(`/table/${id}`, config);
      const categoryDeleted = tables.filter(
        (tableState) => tableState._id !== id
      );
      setTables(categoryDeleted);
      return { msg: "Categoria eliminada correctamente", isError: false };
    } catch (error) {
      console.log(error);
      return { msg: error.response.data.msg, isError: true };
    }
  };
  return (
    <TablesContext.Provider
      value={{
        loader,
        tables,
        table,
        setTable,
        addTable,
        eliminateTable,
        setEdition,
      }}
    >
      {children}
    </TablesContext.Provider>
  );
};

export { TablesProvider };

export default TablesContext;
