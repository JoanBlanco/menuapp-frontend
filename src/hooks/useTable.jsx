import { useContext } from "react";
import TablesContext from "../context/TablesProvider";

const useTable = () => {
    return useContext(TablesContext);
}

export default useTable;