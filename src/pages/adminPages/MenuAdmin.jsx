import { Link } from "react-router-dom";
import CategoriesCard from "../../components/utilies/CategoriesCard";
import useCategory from "../../hooks/useCategory";
import Modal from "../../components/utilies/Modal";
import MealsCard from "../../components/utilies/MealsCard";
import useMeal from "../../hooks/useMeal";
import ScreenLoader from "../../components/utilies/ScreenLoader";
import useAuth from "../../hooks/useAuth";


const MenuAdmin = () => {
  // Hook category
  const { categories} = useCategory();
  const { modalDelete, loader } = useAuth();
  // Hook Meals
  const { meals } = useMeal();

  if (loader)
    return (
      <ScreenLoader loading={loader} />
    );
  return (
    <section key={Date.now()} className="p-8 w-full flex flex-col gap-10">
      {modalDelete.show && <Modal msg={modalDelete?.msg} />}
      {/* Categories */}
      <div className=" w-full text-zinc-800 rounded-lg bg-zinc-100 px-8 py-6 max-h-[30rem] overflow-auto">
        <div className="flex justify-between items-center  text-zinc-800  pb-4">
          <h3 className="font-bold text-xl  md:text-2xl">Categorias</h3>
          <Link
            className="px-4 py-2 text-base w-24 bg-indigo-700 font-bold text-center text-zinc-100 rounded-lg  hover:opacity-80 transition-all ease-in-out"
            to={"/admin/categories"}
          >
            Crear
          </Link>
        </div>

        {!categories.length ? (
          <p className="text-center text-yellow-600">
            {
              "¡No hay categorias, debes crear una para poder crear un platillo!"
            }
          </p>
        ) : (
          categories.map((category) => (
            <CategoriesCard key={category._id} category={category} />
          ))
        )}
      </div>

      <div className=" w-full text-zinc-800 rounded-lg bg-zinc-100 px-8 py-6  overflow-auto flex flex-col gap-4">
        <div className="flex justify-between items-center  text-zinc-800  pb-4 gap-8">
          <h3 className="font-bold text-xl  md:text-2xl">Platillos</h3>
          <Link
            className="px-4 py-2 text-base w-24 bg-indigo-700 font-bold text-center text-zinc-100 rounded-lg max-w-xs hover:opacity-80 transition-all ease-in-out"
            to={"/admin/meals"}
          >
            Crear
          </Link>
        </div>
        {categories.map((category) => (
          <div
            key={category?._id}
            className="w-full flex flex-col gap-4 text-zinc-800"
          >
            <h4 className=" text-lg md:text-lg pb-2  border-b-2">
              {category.nameCategory}
            </h4>
            <div className="grid grid-cols-1 gap-4">
              {meals.map(
                (meal) =>
                  meal?.category?._id === category?._id && (
                    <MealsCard key={meal?._id} meal={meal} />
                  )
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MenuAdmin;
