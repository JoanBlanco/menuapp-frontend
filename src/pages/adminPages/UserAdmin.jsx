import { Link } from "react-router-dom";
import UserCard from "../../components/utilies/UserCard";
import useUser from "../../hooks/useUser";
import ScreenLoader from "../../components/utilies/ScreenLoader";
import Modal from "../../components/utilies/Modal";
import useAuth from "../../hooks/useAuth";

const UserAdmin = () => {
  const { loader, users } = useUser();
  const { modalDelete } = useAuth();

  if (loader) return <ScreenLoader loading={loader} />;

  return (
    <>
      <section key={Date.now()} className="p-8 w-full flex flex-col gap-10">
        {modalDelete.show && <Modal msg={modalDelete?.msg} />} 
        {/* Categories */}
        <div className=" w-full text-zinc-800 rounded-lg bg-zinc-100 px-8 py-6  overflow-auto">
          <div className="flex justify-between items-center  text-zinc-800  pb-4">
            <h3 className="font-bold text-xl  md:text-2xl">Usuarios:</h3>
            <Link
              className="px-4 py-2 text-base w-24 bg-indigo-700 font-bold text-center text-zinc-100 rounded-lg  hover:opacity-80 transition-all ease-in-out"
              to={"/admin/create-user"}
            >
              Crear
            </Link>
          </div>

          {!users.length ? (
            <p className="text-center text-yellow-600">No hay usuarios registrados, prueba creando uno</p>
          ) : (
            users.map((user) => <UserCard key={user._id} user={user} />)
          )}
        </div>
      </section>
    </>
  );
};

export default UserAdmin;
