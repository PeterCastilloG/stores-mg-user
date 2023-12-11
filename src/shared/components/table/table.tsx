import style from "./table.module.scss";
import { BiFirstPage, BiLastPage } from "react-icons/bi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import React, { useState } from "react";
import Modal from "../modal/modal";

export const Table = ({
  properties,
  list,
  page,
  setPage,
  handleEdit,
  handleDelete,
}: {
  properties: {
    nombre: string;
    propertie: string;
  }[];
  list: any[];
  page: number;
  setPage: (page: number) => void;
  handleEdit: (item: any) => void;
  handleDelete: (item: any) => void;
}) => {
  const [deletedItem, setDeletedItem] = useState();
  const [deleteModal, setDeleteModal] = useState(false);

  const deleteItem = () => {
    handleDelete(deletedItem);
    setDeleteModal(false);
  };

  const renderThead = () => {
    return properties.map((item) => (
      <th style={{ width: `${100 / properties.length}%` }} key={item.propertie}>
        {item.nombre}
      </th>
    ));
  };
  const renderTBody = () => {
    const newListReformed = [...list];
    let emptyObject = {};
    for (let index = 0; index < properties.length; index++) {
      const element = properties[index];
      emptyObject = {
        ...emptyObject,
        [element.propertie]: "",
      };
    }
    const missingObjects = 10 - Number(list.length.toString().split("").at(-1));
    for (let index = 0; index < missingObjects; index++) {
      newListReformed.push(emptyObject);
    }
    return newListReformed
      .map((item: any, index) => {
        const values = [];
        for (let index = 0; index < properties.length; index++) {
          const element = properties[index];
          const value = item[element.propertie];
          values.push(value);
        }
        return (
          <tr
            key={index}
            className={`${values.every((item) => item === "") && style.empty}`}
          >
            <td className={style.item}>
              {values.every((item) => item === "") ? "ㅤ" : index + 1}
            </td>
            {values.map((value, index) => {
              return (
                <td key={index}>
                  {
                    {
                      boolean: <button>Hola</button>,
                      object: <select name="" id=""></select>,
                      number: value,
                      string: value,
                    }[
                      typeof value as "string" | "boolean" | "object" | "number"
                    ]
                  }
                </td>
              );
            })}
            <td>
              {!values.every((item) => item === "") && (
                <button onClick={() => handleEdit(item)} className={style.edit}>
                  Editar
                </button>
              )}
            </td>
            <td>
              {!values.every((item) => item === "") && (
                <button
                  onClick={() => {
                    setDeletedItem(item);
                    setDeleteModal(true);
                  }}
                  className={style.edit}
                >
                  Eliminar
                </button>
              )}
            </td>
          </tr>
        );
      })
      .slice(page * 10, page * 10 + 10);
  };

  return (
    <>
      <div className={style.table_container}>
        <table className={style.table}>
          <thead>
            <tr>
              <th className={style.item}>ITEM</th>
              {renderThead()}
              <th style={{ textAlign: `center` }}>EDITAR</th>
              <th style={{ textAlign: `center` }}>ELIMINAR</th>
            </tr>
          </thead>
          <tbody>{renderTBody()}</tbody>
        </table>
      </div>
      <div className={style.pagination}>
        <div className={style.bi} onClick={() => setPage(0)}>
          <BiFirstPage />
        </div>
        <div
          className={style.io}
          onClick={() => {
            if (list.length == 0) {
              return;
            }
            setPage(page === 0 ? Math.ceil(list.length / 10) - 1 : page - 1);
          }}
        >
          <IoIosArrowBack />
        </div>
        <div className={style.current}>
          <div className={style.page}>{page + 1}</div>{" "}
          <div className={style.separator}></div>{" "}
          <div className={style.page}>
            {Math.ceil(list.length / 10) == 0 ? 1 : Math.ceil(list.length / 10)}
          </div>
        </div>
        <div
          className={style.io}
          onClick={() => {
            if (list.length == 0) {
              return;
            }
            setPage(page == Math.ceil(list.length / 10) - 1 ? 0 : page + 1);
          }}
        >
          <IoIosArrowForward />
        </div>
        <div
          className={style.bi}
          onClick={() => setPage(Math.ceil(list.length / 10) - 1)}
        >
          <BiLastPage />
        </div>
      </div>
      <Modal show={deleteModal}>
        <div className={style.modal}>
          <div className={style.modal_content}>
            <p>¿Estas seguro de esta acción?</p>
            <div>
              <button onClick={deleteItem}>SI</button>
              <button onClick={() => setDeleteModal(false)}>NO</button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
