import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import Notification from "../../components/utilies/Notification";
import CloseX from "../../components/icons-svg/CloseX";
import useTable from "../../hooks/useTable";

const CreateTable = () => {
  const {addTable, table, setTable } = useTable();
  // Notification
  const [notification, setNotification] = useState({});
  // Loading
  const [loading, setLoading] = useState(false);
  // UseState inputs
  const [numberTable, setNumberTable] = useState('');
  const [urlTable, setUrlTable] = useState('');
  const [available, setAvailable] = useState(true);

  const { _id } = table

    // UseEffect
    useEffect(() => {
      const objectKey = Object.keys(table);
      objectKey.forEach((key) => {
        if (key === "numberTable") {
          setNumberTable(table.numberTable);
        }
        if (key === "available") {
          setAvailable(table.available);
        }
        if (key === "urlTable") {
          setUrlTable(table.urlTable);
        }
      });
    }, [table]);
  


    // Handle submit
    const handleSubmit = async e => {
        e.preventDefault();
        
        if([numberTable, available, urlTable].includes('')){
          setNotification({
            msg: 'Debe llenar los campos',
            isError: true
          })
          setTimeout(() => setNotification({}), 3000)
          return;
        }
        if ( isNaN( Number(numberTable)) ||  Number(numberTable) <= 0) {
          setNotification({
            msg: "Debe ser número válido",
            isError: true,
          });
          setTimeout(() => setNotification({}), 3000);
          return;
        }
        if (!urlTable.startsWith('http:') && !urlTable.startsWith('https:')) {
          setNotification({
            msg: "Debe ser una url válida",
            isError: true,
          });
          setTimeout(() => setNotification({}), 3000);
          return;
        }

        setLoading(true);
        const msgTable = await addTable({numberTable, available, urlTable, _id});
        setLoading(false);
        setNotification({
          msg: msgTable.msg,
          isError: msgTable.isError
        });

        setTimeout(() => setNotification({}), 3000);
        setNumberTable('');
        setUrlTable('');
        setAvailable(true);

    }
  return (
    <>
      <div className="w-full flex flex-col p-8 gap-10">
        <nav className="w-full p-4 flex justify-end items-center">
          <Link
          onClick={ () => setTable({})}
            className="px-4 py-2 text-lg bg-red-700 font-bold text-center text-zinc-100 rounded-lg max-w-xs hover:opacity-80 transition-all ease-in-out  duration-500"
            to={"/admin/tables"}
          >
            {<CloseX />}
          </Link>
        </nav>
        {/* Form */}
        <form onSubmit={e => handleSubmit(e)} className="w-full max-w-lg bg-zinc-800 m-auto flex flex-col items-center gap-4 p-6 rounded-lg text-zinc-100">
          <h3 className="text-3xl font-bold">{ !_id ? "Crear Mesa" : "Editar Mesa"}</h3>
          {/* Name Category */}
          <div className="flex flex-col gap-2 w-full">
            <label className="w-full" htmlFor="numberTable">
              Numero de mesa:
            </label>
            <input
              className="w-full p-2 rounded-lg bg-transparent border-2"
              type="text"
              id="numberTable"
              placeholder="Ejm: 3"
              autoComplete="off"
              autoFocus={true}
              value={numberTable}
              onChange={e => setNumberTable(e.target.value)}
            />
          </div>
         {/* Url */}
         <div className="flex flex-col gap-2 w-full">
            <label className="w-full" htmlFor="urlTable">
              Url de la página:
            </label>
            <input
              className="w-full p-2 rounded-lg bg-transparent border-2"
              type="text"
              id="urlTable"
              placeholder="Ejm: https://mimenu.com"
              autoComplete="off"
              value={urlTable}
              onChange={e => setUrlTable(e.target.value)}
            />
          </div>
           {_id && (
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="available">Disponibilidad</label>
            <select onChange={(e) => setAvailable(e.target.value)}  value={available} className="cursor-pointer w-full p-2 rounded-lg bg-transparent border-2">
              <option
                className="text-zinc-800 font-bold"
                value=""
                disabled
              >
                Seleccionar una opción
              </option>
              <option className="text-zinc-800 font-bold" value={true}>
                Disponible
              </option>
              <option className="text-zinc-800 font-bold" value={false}>
                No Disponible
              </option>
            </select>
          </div>
        )} 
          {notification.msg && <Notification notification={notification} />}
          {/* Loader */}
          <div
            className={`${
              loading ? "flex" : "hidden"
            } justify-center items-center w-full`}
          >
            <ThreeDots
              height="70"
              width="70"
              radius="9"
              color="#4338ca"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={loading}
            />
          </div>
          <input
            type="submit"
            className="capitalize w-full bg-indigo-700 px-4 py-2 rounded-lg text-lg font-bold hover:opacity-80 hover:scale-y-110 transition-all ease-in-out duration-700 cursor-pointer"
            value={!_id ? "Crear" : "Editar"}
          />
        </form>
      </div>
    </>
  );
};

export default CreateTable;
