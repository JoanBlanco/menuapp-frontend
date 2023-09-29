import { Link } from "react-router-dom";
import useTable from "../../hooks/useTable";
import TablesCard from "../../components/utilies/TablesCard";
import ScreenLoader from "../../components/utilies/ScreenLoader";
import useAuth from "../../hooks/useAuth";
import Modal from "../../components/utilies/Modal";

const TablesAdmin = () => {
  const { loader, tables } = useTable();
  const { modalDelete } = useAuth();
  console.log(tables);
  if (loader)  return (
   <ScreenLoader loading={loader} />
  );
  return (
    <>
      <section key={Date.now()} className="p-8 w-full flex flex-col gap-10">
         {modalDelete.show && <Modal msg={modalDelete?.msg} />} 
        {/* Categories */}
        <div className=" w-full text-zinc-800 rounded-lg bg-zinc-100 px-8 py-6  overflow-auto shadow-md">
          <div className="flex justify-between items-center  text-zinc-800  pb-4">
            <h3 className="font-bold text-xl  md:text-2xl">Mesas:</h3>
            <Link
              className="px-4 py-2 text-base w-24 bg-indigo-700 font-bold text-center text-zinc-100 rounded-lg  hover:opacity-80 transition-all ease-in-out"
              to={"/admin/create-tables"}
            >
              Crear
            </Link>
          </div>
          {!tables.length ? (
            <p className="text-center text-yellow-600">
              {
                "¡No hay mesas creadas, debes crear una para poder asignarla a un pedido!"
              }
            </p>
          ) : (
            tables.map((table) => <TablesCard key={table._id} table={table} />)
          )}
        </div>
      </section>
    </>
  );
};

export default TablesAdmin;
