import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import useCategory from "../../hooks/useCategory";
import Notification from "../../components/utilies/Notification";
import CloseX from "../../components/icons-svg/CloseX";
import useMeal from "../../hooks/useMeal";

const CreateMeals = () => {
  // Hook
  const { categories } = useCategory();
  const { createMeal, meal, setMeal } = useMeal();
  const { _id } = meal;
  // Notification
  const [notification, setNotification] = useState({});
  // Loading
  const [loading, setLoading] = useState(false);
  // UseState inputs
  const [nameMeal, setNameMeal] = useState("");
  const [category, setCategory] = useState("");
  const [imageMeal, setImageMeal] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("$");
  const [available, setAvailable] = useState(true);

  const inputRef = useRef();

  // UseEffect
  useEffect(() => {
    const objectKey = Object.keys(meal);
    objectKey.forEach((key) => {
      if (key === "nameMeal") {
        setNameMeal(meal.nameMeal);
      }
      if (key === "available") {
        setAvailable(meal.available);
      }
      if (key === "category") {
        setCategory(meal.category?.nameCategory);
      }
      if (key === "ingredients") {
        setIngredients(meal.ingredients);
      }
      if (key === "price") {
        setPrice(meal.price);
      }
      if (key === "currency") {
        setCurrency(meal.currency);
      }
    });
  }, [meal]);

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      [
        nameMeal,
        category,
        imageMeal,
        ingredients,
        price,
        currency,
        available,
      ].includes("")
    ) {
      setNotification({
        msg: "Debe llenar todos los campos",
        isError: true,
      });
      setTimeout(() => setNotification({}), 3000);
      return;
    }
    if ( isNaN( Number(price)) ||  Number(price) <= 0) {
      setNotification({
        msg: "Debe ser un monto válido",
        isError: true,
      });
      setTimeout(() => setNotification({}), 3000);
      return;
    }

    setLoading(true);
    const msgMeal = await createMeal({
      nameMeal,
      category,
      imageMeal,
      ingredients,
      price,
      currency,
      available,
      _id,
    });
    setLoading(false);
    setNotification({
      msg: msgMeal.msg,
      isError: msgMeal.isError,
    });
    setTimeout(() => setNotification({}), 3000);
    setAvailable(true);
    setCategory('');
    setImageMeal('');
    setCurrency('$');
    setNameMeal('');
    setIngredients('');
    setPrice('');
  };

  return (
    <div className="w-full flex flex-col p-8 gap-10">
      <nav className="w-full p-4 flex justify-end items-center">
        <Link
          onClick={() => setMeal({})}
          className="px-4 py-2 text-lg bg-red-700 font-bold text-center text-zinc-100 rounded-lg max-w-xs hover:opacity-80 transition-all ease-in-out  duration-500"
          to={"/admin/menu"}
        >
          {<CloseX />}
        </Link>
      </nav>
      {/* Form */}
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="w-full max-w-lg bg-zinc-800 m-auto flex flex-col items-center gap-4 p-6 rounded-lg text-zinc-100"
      >
        <h3 className="text-3xl font-bold">
          {_id ? "Editar Platillo" : "Crear Platillo"}
        </h3>
        {/* Name Meals */}
        <div className="flex flex-col gap-2 w-full">
          <label className="w-full" htmlFor="nameCategory">
            Nombre:
          </label>
          <input
            className="w-full p-2 rounded-lg bg-transparent border-2"
            type="text"
            id="nameCategory"
            placeholder="Ejm: Pizza a la leña"
            autoComplete="off"
            autoFocus={true}
            value={nameMeal}
            onChange={(e) => setNameMeal(e.target.value)}
          />
        </div>
        {/* Img*/}
        <div className="flex flex-col gap-2 w-full">
          <label className="w-full" htmlFor="imageMeal">
            Imagen:
          </label>
          <input
            className="w-full p-2 rounded-lg bg-transparent border-2"
            type="file"
            id="imageMeal"
            ref={inputRef}
            onChange={(e) => setImageMeal(e.target.files[0])}
          />
        </div>
        {/* Price */}
        <div className="flex flex-col gap-2 w-full">
          <label className="w-full" htmlFor="price">
            Precio:
          </label>
          <div className="w-full flex items-center gap-4">
            <input
              disabled
              type="text"
              className="p-2 text-center rounded-lg bg-transparent border-2  w-1/5"
              value={currency}
            />
            <input
              className="  w-4/5 p-2 rounded-lg bg-transparent border-2"
              type="text"
              id="price"
              placeholder="Ejm: 12"
              autoComplete="off"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-col gap-2 w-full">
          <label className="w-full" htmlFor="category">
            Categoria
          </label>
          <select
            className="w-full p-2 rounded-lg bg-transparent border-2"
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option className="text-zinc-800" disabled value="">
              Selecciona una categoria
            </option>

            {categories.map((category) => {
              return (
                <>
                  <option
                    key={category._id}
                    className="text-zinc-800"
                    value={category.nameCategory}
                  >
                    {category.nameCategory}
                  </option>
                </>
              );
            })}
          </select>
        </div>
        {/* Available */}
        {_id && (
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="available">Disponibilidad</label>
            <select
              onChange={(e) => setAvailable(e.target.value)}
              value={available}
              className="cursor-pointer w-full p-2 rounded-lg bg-transparent border-2"
            >
              <option className="text-zinc-800 font-bold" value="" disabled>
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

        {/* Ingredients */}
        <div className="flex flex-col gap-2 w-full">
          <label className="w-full" htmlFor="ingredients">
            Ingrendientes
          </label>
          <textarea
            className="w-full p-2 rounded-lg bg-transparent border-2  max-h-26 max-h-20"
            type="text"
            id="ingredients"
            placeholder="Ejm: Pepperoni, queso mozarella, salsa"
            autoComplete="off"
            autoFocus={true}
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
        </div>

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

export default CreateMeals;
