import useOrder from "../../hooks/useOrder";
import useMeal from "../../hooks/useMeal";
import useAuth from "../../hooks/useAuth";
import Modal from "../../components/utilies/Modal";
import { Link } from "react-router-dom";
import ScreenLoader from "../../components/utilies/ScreenLoader";
import { useState } from "react";

const Orders = () => {
  const {
    orders,
    setOrder,
    addOrder,
    setTableId,
    eliminateOneMeal,
    setEdition,
    finishOrder,
  } = useOrder();
  const { meals } = useMeal();
  const { auth, setModalDelete, modalDelete } = useAuth();
  const [loading, setLoading] = useState(false)
  const createOrder = async (order) => {
    console.log(order);
    setTableId(order?.tableId);
    setOrder({ _id: order._id });
    setLoading(true)
    const msgOrder = await addOrder(order);
    alert(msgOrder.msg);
    setLoading(false)
  };
  const deleteOne = async (order) => {
    console.log(order);
    setTableId(order?.tableId);
    setLoading(true)
    const msgOrder = await eliminateOneMeal(order);
    alert(msgOrder.msg);
    setLoading(false)
  };

  const finish = async (_id) => {
    const confirmation = confirm('¿Desea finalizar el pedido?');
    console.log(confirmation, _id);
    if (!confirmation) {
     alert('Se ha cancelado la opción')
    }
    setLoading(true)
    const msgOrder = await finishOrder(_id);
     alert(msgOrder.msg)
     setLoading(false)
     
  }
  return (
    <section className="h-100 w-full flex flex-col p-8 gap-4">
    <div className={loading ? 'flex' : 'hidden'}>
    <ScreenLoader loading={loading}/>
    </div>
      {modalDelete.show && <Modal msg={modalDelete?.msg} />}
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-4xl">Pedidos:</h2>

        <Link className="p-2 bg-red-700 rounded-lg text-center text-zinc-100 font-bold" to={'/user/create-order'}>Regresar</Link>
      </div>
      {!orders.length ? (
        <p className=" text-center text-yellow-700">No hay pedidos pendientes, cualquier error reinicie la página</p>
      ) : (
        orders.map(
          (order) =>
            !order.paid && order.waiterId._id.toString() === auth?._id && !order.finished && (
              <>
                {/* Orders */}
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
                  <div className="flex flex-col gap-2 py-2 border-b-2 border-b-zinc-800">
                    <div className="flex justify-between">
                      <p className="w-1/3 text-center">Cant</p>
                      <p className="w-1/3 text-center">Detalle</p>
                      <p className="w-1/3 text-center">Precio</p>
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
                                    <div className="w-1/3 flex justify-center gap-2 items-center">
                                      <span>{mealOrder.amount}</span>
                                      {/* Add button */}
                                      <button
                                        onClick={async () => {
                                          setOrder({ _id: order._id });
                                          createOrder({
                                            mealsId: meal._id,
                                            tableId: order.tableId._id,
                                            _id: order._id,
                                          });
                                        }}
                                        type="button"
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="icon icon-tabler icon-tabler-circle-plus text-green-600"
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
                                          <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                                          <path d="M9 12h6"></path>
                                          <path d="M12 9v6"></path>
                                        </svg>
                                      </button>
                                      {/* Button minus */}
                                      <button
                                        onClick={async () => {
                                          setOrder({ _id: order._id });
                                          deleteOne({
                                            mealsId: meal._id,
                                            tableId: order.tableId._id,
                                            _id: order._id,
                                          });
                                        }}
                                        type="button"
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="icon icon-tabler icon-tabler-circle-minus text-red-600"
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
                                          <path d="M9 12l6 0"></path>
                                        </svg>
                                      </button>
                                    </div>
                                    <p className="w-1/3 text-center">
                                      {meal.nameMeal}
                                    </p>
                                    <p className="w-1/3 text-center">
                                      {mealOrder.priceMeal}{" "}
                                      <span>{meal.currency}</span>
                                    </p>
                                  </>
                                )
                            )}
                          </div>
                        </>
                      ))}
                    </div>
                  </div>
                  {/* Total */}
                  <div className="flex justify-between items-center">
                    <div className="flex gap-4 items-center">
                      {/* Delete Button */}
                      <button
                        onClick={() =>
                          setModalDelete({
                            msg: "¿Estás seguro de eliminar este pedido del pedido??",
                            show: true,
                            _id: order._id,
                            type: "order",
                          })
                        
                        }
                        className="flex"
                        type="button"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-trash-filled text-red-700"
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
                            d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16z"
                            strokeWidth="0"
                            fill="currentColor"
                          ></path>
                          <path
                            d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z"
                            strokeWidth="0"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </button>
                      {/* edit Button */}
                      <Link
                        onClick={async () =>
                          setEdition({
                            tableId: order.tableId._id,
                            _id: order._id,
                          })
                        }
                        to={'/user/create-order'}
                        className="flex"
                        type="button"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-edit-circle text-indigo-700"
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
                          <path d="M12 15l8.385 -8.415a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3z"></path>
                          <path d="M16 5l3 3"></path>
                          <path d="M9 7.07a7 7 0 0 0 1 13.93a7 7 0 0 0 6.929 -6"></path>
                        </svg>
                      </Link>
                    </div>
                    <div>
                      <button onClick={
                        () => {
                          finish(order._id);
                        }
                      }  type="button" className="px-4 py-2 bg-indigo-700 font-bold text-zinc-100 rounded shadow-lg">Finalizar Pedido</button>
                    </div>
                    <p className="text-xl">
                      Total: <span>{order.total} $</span>
                    </p>
                  </div>
                </div>
              </>
            )
        )
      )}
    </section>
  );
};

export default Orders;
