import useCategory from "../../hooks/useCategory";
import useMeal from "../../hooks/useMeal";
import useAuth from "../../hooks/useAuth";
import useTable from "../../hooks/useTable";
import useUser from "../../hooks/useUser";
import useOrder from "../../hooks/useOrder";

const Modal = ({ msg }) => {
  const {  eliminateCategory } = useCategory();
   const {setModalDelete, modalDelete } = useAuth();

   const { eliminateTable } = useTable();

   const { eliminateMeal } = useMeal();

   const { eliminateUser } = useUser();

   const { eliminateOrder } = useOrder();

  return (
    <>
      <div
        id="popup-modal"
        tabIndex="-1"
        className={` flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 z-50  p-4 overflow-x-hidden overflow-y-auto max-h-full`}
      >
        <div className="relative w-full max-w-lg max-h-full">
          <div className="relative rounded-lg shadow bg-zinc-800">
            <button
            onClick={ () => setModalDelete({}) }
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="popup-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>

            </button>
            <div className="p-6 text-center flex flex-col gap-2">
              <svg
                className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className="mb-5 textLg font-normal text-gray-500 dark:text-gray-400">
                {msg}
              </h3>
             <div className="flex justify-center items-center gap-6">
             <button
             onClick={() => {
                

                if(modalDelete.type === 'category') {
                  eliminateCategory(modalDelete._id);

                }

                if(modalDelete.type === 'meal') {
                  eliminateMeal(modalDelete._id)

                }

                if(modalDelete.type === 'table') {
                  eliminateTable(modalDelete._id)

                }
                if(modalDelete.type === 'user') {
                  eliminateUser(modalDelete._id)

                }

                if(modalDelete.type === 'user') {
                  eliminateUser(modalDelete._id)

                }
                if(modalDelete.type === 'order') {
                  eliminateOrder(modalDelete._id)

                }
              
                setModalDelete({});
             }}
                data-modal-hide="popup-modal"
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2 ease-in-out transition-all"
              >
                Eliminar
              </button>
              <button
              onClick={ () => setModalDelete({}) }
                data-modal-hide="popup-modal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600 ease-in-out transition-all"
              >
                Cancelar
              </button>
             </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
