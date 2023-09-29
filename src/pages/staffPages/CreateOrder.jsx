import useCategory from "../../hooks/useCategory";
import useTable from "../../hooks/useTable";
import useMeal from "../../hooks/useMeal";
import useAuth from "../../hooks/useAuth";
import useOrder from "../../hooks/useOrder";
import { Link } from "react-router-dom";

const CreateOrder = () => {
  // Hooks
  const { categories } = useCategory();
  const { tables } = useTable();
  const { meals } = useMeal();
  const { loader } = useAuth();
  // Use States

  const { tableId, setTableId, addOrder, order, setOrder } = useOrder();
  if (loader) {
    return "Loader....";
  }

  const {_id} = order
  const createOrder = async (mealsId) =>{
    if (!tableId) {
      alert('Debes elegir una mesa primero')
      return
    }

    
    if (!mealsId) {
      alert('No hay platillo')
      return
    }
    const msgOrder = await addOrder({mealsId, tableId, _id});
    alert(msgOrder.msg)

  }
  
  return (
    <>
      <section className="h-100 w-full flex flex-col ">
        <form className="w-full flex justify-center items-center flex-wrap p-4 gap-8">

          <div className="flex flex-col items-starts gap-2">
            <select
              className="p-2 rounded-lg outline-0  bg-transpate
             text-zinc-800 font-bold"
              value={tableId}
              onChange={(e) => {
                setTableId(e.target.value)
              }}
            >
              <option className="text-zinc-800" value="">
                Selecciona una mesa
              </option>
              {tables.length &&
                tables.map((table) => table?.available && (
                  <option
                    key={table._id}
                    className="text-zinc-800"
                    value={table._id}
                  >
                    Mesa {table.numberTable}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <Link to={'/user/orders'} className="px-4 py-2 bg-indigo-700 rounded-lg shadow-lg text-zinc-100 font-bold">Ver pedidos</Link>
          </div>
          <div>
            <button onClick={(e) => {
              e.preventDefault()
              setOrder({})
              setTableId('')
            }} className="px-4 py-2 bg-indigo-700 rounded-lg shadow-lg text-zinc-100 font-bold">Pedido Nuevo</button>
          </div>
        </form>

        <div className="p-8 flex flex-col items-center gap-8">
          {categories.length &&
            categories.map((category) => category?.available && (
              <div
                key={category._id}
                className="w-full flex flex-col justify-center items-center gap-4"
              >
                <h3 className="text-3xl">{category.nameCategory}</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 place-items-center items-center gap-8 w-full">
                  {meals.map(
                    (meal) =>
                      meal?.category?._id === category?._id && meal?.available && (
                        <div
                          key={meal._id}
                          className="max-w-xs max-h-[36rem] rounded-lg shadow-lg overflow-auto  p-4 "
                        >
                          <div className="w-full  flex justify-center items-center">
                            <img
                              className="w-full object-contain rounded-lg h-50 h-52"
                              src={`http://localhost:4000${meal.imageMeal}`}
                              alt={meal.nameMeal}
                            />
                          </div>
                          <div className="flex flex-col gap-2 h-2/4">
                            <p className="w-full break-words text-2xl text-center">
                              {meal.nameMeal}
                            </p>
                            <p className="w-full break-words text-base text-center">
                              {meal.ingredients}
                            </p>
                            <p className="w-full break-words text-2xl text-center">
                              {meal.price} <span>{meal.currency}</span>
                            </p>
                            <button
                            value={meal._id}
                            onClick={ (e) => {
                        
                            createOrder(e.target.value)

                               }}
                              type="button"
                              className="bg-indigo-700 px-4 py-2 rounded-lg text-zinc-100 font-bold hover:opacity-80"
                            >
                              Agregar al pedido
                            </button>
                          </div>
                        </div>
                      )
                  )}
                </div>
              </div>
            ))}
        </div>
      </section>
    </>
  );
};

export default CreateOrder;
