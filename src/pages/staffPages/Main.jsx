import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Main = () => {
  const { userRol } = useAuth();
  return (
    <>
      {userRol.nameRol === "mesonero" && (
        <div className="h-100 w-full flex flex-col lg:flex-row justify-center items-center gap-8">
          <Link to={'/user/orders'} className="bg-indigo-700 px-4 py-2 w-72  text-zinc-100 rounded-lg  text-center font-bold hover:opacity-80 transition-all ease-in-out duration-500">
            Ver Pedidos
          </Link>

          <Link to={"/user/create-order"} className="bg-indigo-700 px-4 py-2 w-72  text-zinc-100 rounded-lg  text-center font-bold hover:opacity-80 transition-all ease-in-out duration-500">
            Crear Pedido
          </Link>
        </div>
      )}
    </>
  );
};

export default Main;
