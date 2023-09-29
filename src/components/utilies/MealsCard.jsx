import React from "react";
import useMeal from "../../hooks/useMeal";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


const MealsCard = ({meal}) => {
  // Hook Meal
   const { setEdition } =  useMeal();
  // Hook auth for use modal
   const { setModalDelete } = useAuth();
   // Destructuring
    const { nameMeal, category, imageMeal, ingredients, price, currency, available, _id, userId } = meal;
    const navigate = useNavigate();
  return (
    <>
      {/* Meal */}
      <div className="py-4 flex flex-col md:flex-row justify-between items-center gap-2 overflow-auto w-full ">
        {/* Img */}
        <div className="rounded-lg h-20 flex justify-center items-center w-full ">
          <img
            className="h-full rounded-lg"
            src={`http://localhost:4000${imageMeal}`}
            alt={nameMeal}
          />
        </div>
        {/* Name */}
        <div className="w-full  flex justify-center items-center ">
          <p className="text-lg text-center w-full break-words">
            {nameMeal}
          </p>
        </div>
        {/* Ingredients */}
        <div className="flex justify-center items-center w-full sm:max-w-[12rem] ">
          <p className="text-sm text-center break-words  w-full">
            {ingredients}
          </p>
        </div>
        {/* Price */}
        <div className="flex justify-center items-center px-2 gap-1">
          <p className="text-lg text-center">{price}</p>
          <span>{currency}</span>
        </div>
        {/* Available */}
        <div className="w-full flex justify-center items-center ">
          <span className={`${ available ? ' text-green-500' : 'text-red-500' } text-sm text-green-500 font-bold `}>Disponible</span>
        </div>
        {/* Button */}
        <div className="flex justify-center items-center gap-4 ">
          <button
          onClick={
            () => {
              setEdition(meal);
              navigate("/admin/meals");
            }
          }
            type="button"
            className="hover:opacity-80 ease-in-out transition-all hover:scale-105"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-indigo-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>
          </button>
          <button
          onClick={() =>{
            setModalDelete({ msg: '¿Está seguro de eliminar este platillo?', show: true, _id, type: 'meal'})}
          }
            type="button"
            className="hover:opacity-80 ease-in-out transition-all hover:scale-105"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default MealsCard;
