import useOrder from "../../hooks/useOrder";
import useMeal from "../../hooks/useMeal";
// import useAuth from "../../hooks/useAuth";


const OrdersKitchen = () => {
  const { orders, setOrder, setTableId, checkOrder } = useOrder();
  const { meals } = useMeal();
//   const { auth } = useAuth();

  const checkingOrder = async (order) => {
    console.log(order);
    setTableId(order?.tableId);
    setOrder({ _id: order._id });
    const msgOrder = await checkOrder(order);
    alert(msgOrder.msg);
  };

  return (
    <section className="h-100 w-full flex flex-col p-8 gap-4">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-4xl">Pedidos:</h2>
      </div>
      {!orders.length ? (
        <p className=" text-center text-yellow-700">
          No hay pedidos pendientes, cualquier error reinicie la página
        </p>
      ) : (
        orders.map(
          (order) =>
            !order.paid && !order.finished && (
              <>
                {/* OrdersKitchen */}
                <div
                  key={order._id}
                  className="flex flex-col gap-4 bg-red-50 p-4 rounded-lg shadow-lg"
                >
                  {/* Info Order */}
                  <div className="flex flex-col gap-2 py-2 border-b-2  border-b-zinc-800">
                    <p className="text-xl">
                      Orden: <span>{order._id}</span>
                    </p>
                    <p className="text-xl">{order.waiterId.username}</p>
                    <p className="text-xl">Mesa {order.tableId.numberTable}</p>
                    { order?.state === 'enviado' && <p className="text-xl text-yellow-700 font-bold">Enviado</p> }
                    { order?.state === 'recibido' && <p className="text-xl text-yellow-400 font-bold">Recibido</p> }
                    { order?.state === 'listo' && <p className="text-xl text-green-700 font-bold">Listo</p> }
                  </div>
                  {/* Meals */}
                  <div className="flex flex-col gap-2 py-2">
                    <div className="flex justify-between">
                      <p className=" w-1/3 text-center font-bold">Check</p>
                      <p className="w-1/3 text-center font-bold">Cant</p>
                      <p className="w-1/3 text-center font-bold">Detalle</p>
                    </div>

                    <div className="flex flex-col gap-2">
                      {order.meals.map((mealOrder) => (
                        <>
                          {" "}
                          <div
                            key={mealOrder._id}
                            className="flex justify-between items-center"
                          >
                            {meals.map(
                              (meal) =>
                                meal._id.toString() ===
                                  mealOrder.mealId.toString() && (
                                  <>
                                    <div className="w-1/3 flex justify-center  items-center">
                                      <button
                                        onClick={() =>
                                          checkingOrder({
                                            _id: order._id,
                                            mealsId: meal._id,
                                            idMeal : mealOrder._id
                                          })
                                        }
                                        type="button"
                                        className="pointer"
                                      >
                                        {!mealOrder?.check ? (
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="icon icon-tabler icon-tabler-circle text-green-600"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            strokeWidth="2"
                                            stroke="currentColor"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          >
                                            <path
                                              stroke="none"
                                              d="M0 0h24v24H0z"
                                              fill="none"
                                            ></path>
                                            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                                          </svg>
                                        ) : (
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="icon icon-tabler icon-tabler-circle-check-filled text-green-600"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            strokeWidth="2"
                                            stroke="currentColor"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          >
                                            <path
                                              stroke="none"
                                              d="M0 0h24v24H0z"
                                              fill="none"
                                            ></path>
                                            <path
                                              d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                                              strokeWidth="0"
                                              fill="currentColor"
                                            ></path>
                                          </svg>
                                        )}
                                      </button>
                                    </div>
                                    <div className="w-1/3 flex justify-center gap-2 items-center">
                                      <span>{mealOrder.amount}</span>
                                    </div>
                                    <p className="w-1/3 text-center">
                                      {meal.nameMeal}
                                    </p>
                                  </>
                                )
                            )}
                          </div>
                        </>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )
        )
      )}
    </section>
  );
};

export default OrdersKitchen;
