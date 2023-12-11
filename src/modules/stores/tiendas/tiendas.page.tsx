"use client";
import { useEffect, useState } from "react";
import styles from "./tiendas.page.module.scss";
import { ITienda, TTiendaState } from "./interfaces/tiendas.interfaces";
import { Edit } from "./componentes/edit/edit";
import { Create } from "./componentes/create/create";
import { List } from "./componentes/list/list";
import { storesDelete, storesList } from "@/shared/services/store.service";
import { clsx } from "@/shared/lib/clx";
import { generateReport } from "@/shared/util/generate-report";

export default function TiendasPage() {
  const [pageState, setPageState] = useState<TTiendaState>("LIST");
  const [tiendaList, setTiendList] = useState<Array<ITienda>>([]);
  const [tiendaEdit, setTiendaEdit] = useState<ITienda>();

  function handleChangeTab(tab: TTiendaState) {
    if (tab !== "EDIT") setTiendaEdit(undefined);
    setPageState(tab);
  }

  function handleEdit(data: ITienda) {
    setTiendaEdit(data);
    setPageState("EDIT");
  }

  function handleCreate(tienda: ITienda) {
    setTiendList([tienda, ...tiendaList]);
    setPageState("LIST");
  }

  function handleUpdate(tienda: ITienda) {
    setTiendList(
      tiendaList.map((item) =>
        item.storeId === tienda.storeId ? tienda : item
      )
    );
    setPageState("LIST");
  }

  async function handleDelete(data: ITienda) {
    setTiendList(
      tiendaList.filter((item) => item.storeId !== data.storeId)
    );
    const { success } = await storesDelete(data.storeId);
    if (!success) setTiendList(tiendaList);
  }

  async function getTiendas() {
    const { success, data } = await storesList();
    if (success) setTiendList(data.items);
  }

  useEffect(() => {
    getTiendas();
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
              !tiendaEdit && styles.block,
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
          onClick={() => generateReport(tiendaList)}
        >
          DESCARGAR REPORTE
        </button>
      </div>
      <div className={styles.content}>
        {
          {
            EDIT: <Edit handleUpdate={handleUpdate} edit={tiendaEdit!} />,
            CREATE: <Create handleCreate={handleCreate} />,
            LIST: <List list={tiendaList} handleEdit={handleEdit} handleDelete={handleDelete}/>,
          }[pageState]
        }
      </div>
    </div>
  );
}
