import { Table } from "@/shared/components/table/table";
import {
  IProductHistory,
  IProducto,
} from "../../interfaces/productos.interfaces";
import styles from "./prodcut-history.module.scss";
import { Fragment, useState } from "react";
import Modal from "@/shared/components/modal/modal";
import { ProductHistoryCreate } from "../product-history-create/product-history-create";
import { IAlmacen } from "@/modules/stores/almacenes/interfaces/almacenes.interfaces";
import { productsFindById } from "@/shared/services/product.service";
import { toast } from "react-toastify";
import { productHistoriesDelete } from "@/shared/services/product-history.service";
import { IoMdClose } from "react-icons/io";
import { ProductHistoryEdit } from "../product-history-edit/product-history-edit";

export function ProductHistory({
  productId,
  productHistoryList,
  almacenes,
  handleUpdate,
}: {
  productId: number;
  productHistoryList: Array<IProductHistory>;
  almacenes: Array<IAlmacen>;
  handleUpdate: (data: IProducto) => void;
}) {
  const [page, setPage] = useState(0);
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [historyEdit, setHistoryEdit] = useState<IProductHistory>();

  async function handleReload(info: IProductHistory) {
    setCreateModal(false);
    const { success, data } = await productsFindById(productId);
    if (success) handleUpdate(data.item);
    else toast.error("Ocurrio un fallo al guardar");
  }

  function handleCreate() {
    setCreateModal(true);
  }

  function handleEdit(data: IProductHistory) {
    setHistoryEdit(data);
    setEditModal(true);
  }

  async function handleDelete(info: IProductHistory) {
    const { success: successsDelete } = await productHistoriesDelete(
      info.productHistoryId
    );
    if (!successsDelete) toast.error("Ocurrio un fallo al eliminar");
    const { success: successFind, data } = await productsFindById(productId);
    if (successFind) {
      handleUpdate(data.item);
      setPage(0);
    } else toast.error("Ocurrio un fallo al eliminar");
  }

  return (
    <Fragment>
      <Table
        page={page}
        setPage={setPage}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        list={productHistoryList.map((item) => ({
          ...item,
          warehouse_name: item.warehouse.name,
        }))}
        properties={[
          {
            nombre: "Fecha de expiración",
            propertie: "expiryDate",
          },
          {
            nombre: "Cantidad total",
            propertie: "quantity",
          },
          {
            nombre: "Cantidad en uso",
            propertie: "used",
          },
          {
            nombre: "Almacen",
            propertie: "warehouse_name",
          },
        ]}
      />
      <button className={styles.add} onClick={handleCreate}>
        Agregar
      </button>
      <Modal show={createModal}>
        <div className={styles.container}>
          <div className={styles.content}>
            <ProductHistoryCreate
              productId={productId}
              almacenes={almacenes}
              handleCreate={handleReload}
            />
            <div className={styles.close} onClick={() => setCreateModal(false)}>
              <IoMdClose />
            </div>
          </div>
        </div>
      </Modal>
      {historyEdit && (
        <Modal show={editModal}>
          <div className={styles.container}>
            <div className={styles.content}>
              <ProductHistoryEdit
                almacenes={almacenes}
                handleEdit={handleReload}
                history={historyEdit}
              />
              <div className={styles.close} onClick={() => setEditModal(false)}>
                <IoMdClose />
              </div>
            </div>
          </div>
        </Modal>
      )}
    </Fragment>
  );
}
