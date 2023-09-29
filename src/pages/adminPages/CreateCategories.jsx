import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import useCategory from "../../hooks/useCategory";
import Notification from "../../components/utilies/Notification";
import CloseX from "../../components/icons-svg/CloseX";

const CreateCategories = () => {
  const { addCategory, category, setCategory } = useCategory();
  const { _id } = category;
  // Use State
  const [nameCategory, setNameCategory] = useState("");
  const [available, setAvailable] = useState(true);
  // Notification
  const [notification, setNotification] = useState({});
  // Loading
  const [loading, setLoading] = useState(false);
  // UseEffect
  useEffect(() => {
    const objectKey = Object.keys(category);
    objectKey.forEach((key) => {
      if (key === "nameCategory") {
        setNameCategory(category.nameCategory);
      }
      if (key === "available") {
        setAvailable(category.available);
      }
    });
  }, [category]);

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate
    if (!nameCategory && !available) {
      setNotification({
        msg: "Debe llenar todos los campos",
        isError: true,
      });
      setTimeout(() => setNotification({}), 3000);
      return;
    }
    setLoading(true);
    const categorieMsg = await addCategory({nameCategory, _id, available});
    setLoading(false);
    setNotification({
      msg: categorieMsg.msg,
      isError: categorieMsg.isError,
    });
    setTimeout(() => setNotification({}), 3000);
    setNameCategory("");
  };
  return (
    <div className="w-full flex flex-col p-8 gap-10">
      <nav className="w-full p-4 flex justify-end items-center">
        <Link onClick={() => setCategory({})}
          className="px-4 py-2 text-lg bg-red-700 font-bold text-center text-zinc-100 rounded-lg max-w-xs hover:opacity-80 transition-all ease-in-out  duration-500"
          to={"/admin/menu"}
        >
         {<CloseX/>}
        </Link>
      </nav>
      {/* Form */}
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="w-full max-w-lg bg-zinc-800 m-auto flex flex-col items-center gap-4 p-6 rounded-lg text-zinc-100"
      >
        <h3 className="text-3xl font-bold">
          {_id ? "Editar Categoria" : "Crear Categoria"}
        </h3>
        {/* Name Category */}
        <div className="flex flex-col gap-2 w-full">
          <label className="w-full" htmlFor="nameCategory">
            Nombre:
          </label>
          <input
            className="w-full p-2 rounded-lg bg-transparent border-2"
            type="text"
            id="nameCategory"
            placeholder="Ejm: Bebidas"
            autoComplete="off"
            autoFocus={true}
            value={nameCategory}
            onChange={(e) => setNameCategory(e.target.value)}
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
          value={_id ? "Editar" : "Crear"}
        />
      </form>
    </div>
  );
};

export default CreateCategories;
