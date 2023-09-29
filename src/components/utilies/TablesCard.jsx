import React from "react";
import QRCode from "react-qr-code";
import useTable from "../../hooks/useTable";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const TablesCard = ({table}) => {
  const {numberTable, available, urlTable, _id} = table;
  const {setEdition} = useTable();
  const {setModalDelete} = useAuth();

  const navigate = useNavigate();
  return (
    <>
      <div className={`flex flex-col md:flex-row gap-4 justify-between items-center bg-zinc-100  text-zinc-800  border-b-2 py-4 transition-all ease-in-out`}>
        <div>
          <p>{`Mesa ${numberTable}`}</p>
        </div>

        {/* Qr code */}
        <div className="h-auto m-auto  max-w-[5rem] w-fullcflex justify-center bg-red-600"
      
        >
          <QRCode  
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={urlTable}
            viewBox={`0 0 256 256`}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-center items-center gap-4">
          <button
            type="button"
             onClick={() => {
               setEdition(table);
               navigate("/admin/create-tables");
             }}
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
             onClick={() =>
               setModalDelete({
                 msg: "¿Está seguro de eliminar esta mesa?",
                 show: true,
                 _id,
                 type: "table",
               })
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

          {/* Available dot */}
          <div>
            <div className={`${ available ? 'bg-green-500' : 'bg-red-500' }  rounded-full p-1 `}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TablesCard;
