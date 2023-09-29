import useOrder from "../../hooks/useOrder";
import useMeal from "../../hooks/useMeal";
import useAuth from "../../hooks/useAuth";
import Modal from "../../components/utilies/Modal";

import { useState } from "react";
import ScreenLoader from "../../components/utilies/ScreenLoader";

const AdminOrders = () => {
  const {
    orders,
    payOrder
  } = useOrder();
  const { meals } = useMeal();
  const {  modalDelete } = useAuth();
  const [loading, setLoading] = useState(false)
  const [totalPay, setTotalPay] = useState('')

  const handleSubmit = async (e, _id) => {
    e.preventDefault();

    if (!totalPay || isNaN(Number(totalPay)) ) {
        alert('Debe colocar un monto válido');
        return;
    }
    setLoading(true)
    const msgOrder = await payOrder({_id, totalPay});
    setLoading(false);
    alert(msgOrder.msg)
    setTotalPay('');
  }
  return (
    
    <section className="h-100 w-full flex flex-col p-8 gap-4">
    <div className={loading ? 'flex' : 'hidden'}>
    <ScreenLoader loading={loading}/>
    </div>
    
      {modalDelete.show && <Modal msg={modalDelete?.msg} />}
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
       
       !order?.paid &&
       (
              <>
                {/* AdminOrders */}
                <div
                  key={order._id}
                  className="flex flex-col  bg-red-50 p-4 rounded-lg shadow-lg"
                >
                  {/* Info Order */}
                  <div className="flex flex-col gap-2 py-2 border-b-2  border-b-zinc-800">
                    <p className="text-xl">
                      Orden: <span>{order.numberOrder}</span>
                    </p>
                    <p className="text-xl">{order?.waiterId?.username}</p>
                    <p className="text-xl">Mesa {order.tableId.numberTable}</p>
                    { order?.paid && <p className="text-xl text-red-700 font-bold">Pagado</p> }
                    { order?.state === 'enviado' && <p className="text-xl text-yellow-700 font-bold">Enviado</p> }
                    { order?.state === 'recibido' && <p className="text-xl text-yellow-400 font-bold">Recibido</p> }
                    { order?.state === 'listo' && <p className="text-xl text-green-700 font-bold">Listo</p> }
                  </div>
                  {/* Meals */}
                  <div className="flex flex-col gap-2 py-2 border-b-2 border-b-zinc-800">
                    <div className="flex justify-between">
                      <p className="w-1/3 text-center font-bold">Cant</p>
                      <p className="w-1/3 text-center font-bold">Detalle</p>
                      <p className="w-1/3 text-center font-bold">Precio</p>
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
                    <p className="text-xl">
                      Total: <span className="font-bold">{order.total} $</span>
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

export default AdminOrders;
