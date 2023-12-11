"use client";
import { useEffect, useState } from "react";
import styles from "./almacenes.page.module.scss";
import { IAlmacen, TAlmacenState } from "./interfaces/almacenes.interfaces";
import { Edit } from "./componentes/edit/edit";
import { Create } from "./componentes/create/create";
import { List } from "./componentes/list/list";
import { clsx } from "@/shared/lib/clx";
import { generateReport } from "@/shared/util/generate-report";
import {
  warehousesDelete,
  warehousesList,
} from "@/shared/services/warehouse.service";

export default function AlmacenesPage() {
  const [pageState, setPageState] = useState<TAlmacenState>("LIST");
  const [almacenList, setAlmacenList] = useState<Array<IAlmacen>>([]);
  const [alamcenEdit, setTiendaEdit] = useState<IAlmacen>();

  function handleChangeTab(tab: TAlmacenState) {
    if (tab !== "EDIT") setTiendaEdit(undefined);
    setPageState(tab);
  }

  function handleEdit(data: IAlmacen) {
    setTiendaEdit(data);
    setPageState("EDIT");
  }

  function handleCreate(data: IAlmacen) {
    setAlmacenList([data, ...almacenList]);
    setPageState("LIST");
  }

  function handleUpdate(data: IAlmacen) {
    setAlmacenList(
      almacenList.map((item) =>
        item.warehouseId === data.warehouseId ? data : item
      )
    );
    setPageState("LIST");
  }

  async function handleDelete(data: IAlmacen) {
    setAlmacenList(
      almacenList.filter((item) => item.warehouseId !== data.warehouseId)
    );
    const { success } = await warehousesDelete(data.warehouseId);
    if (!success) setAlmacenList(almacenList);
  }

  async function getAlmacenes() {
    const { success, data } = await warehousesList();
    if (success) setAlmacenList(data.items);
  }

  useEffect(() => {
    getAlmacenes();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <ul className={styles.tabs}>
          <li
            onClick={() => handleChangeTab("LIST")}
            className={clsx(pageState === "LIST" && styles.active)}
          >
            Tiendas
          </li>
          <li
            onClick={() => handleChangeTab("EDIT")}
            className={clsx(
              !alamcenEdit && styles.block,
              pageState === "EDIT" && styles.active
            )}
          >
            Editar
          </li>
          <li
            onClick={() => handleChangeTab("CREATE")}
            className={clsx(pageState === "CREATE" && styles.active)}
          >
            Crear
          </li>
        </ul>
        <button
          className={styles.report}
          onClick={() => generateReport(almacenList)}
        >
          DESCARGAR REPORTE
        </button>
      </div>
      <div className={styles.content}>
        {
          {
            EDIT: <Edit handleUpdate={handleUpdate} edit={alamcenEdit!} />,
            CREATE: <Create handleCreate={handleCreate} />,
            LIST: (
              <List
                list={almacenList}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ),
          }[pageState]
        }
      </div>
    </div>
  );
}
