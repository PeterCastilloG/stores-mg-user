"use client";
import { useEffect, useState } from "react";
import styles from "./clientes.page.module.scss";
import { ICliente, TMarcaState } from "./interfaces/cliente.interfaces";
import { Edit } from "./componentes/edit/edit";
import { Create } from "./componentes/create/create";
import { List } from "./componentes/list/list";
import { clsx } from "@/shared/lib/clx";
import { generateReport } from "@/shared/util/generate-report";
import { brandsDelete, brandsList } from "@/shared/services/brand.service";
import { ITienda } from "../tiendas/interfaces/tiendas.interfaces";
import { storesList } from "@/shared/services/store.service";
import { customersList } from "@/shared/services/customer.service";

export default function ClientesPage() {
  const [pageState, setPageState] = useState<TMarcaState>("LIST");
  const [tiendaList, setTiendaList] = useState<Array<ITienda>>([]);
  const [clienteList, setClienteList] = useState<Array<ICliente>>([]);
  const [clienteEdit, setClienteEdit] = useState<ICliente>();

  function handleChangeTab(tab: TMarcaState) {
    if (tab !== "EDIT") setClienteEdit(undefined);
    setPageState(tab);
  }

  function handleEdit(data: ICliente) {
    setClienteEdit(data);
    setPageState("EDIT");
  }

  function handleCreate(data: ICliente) {
    setClienteList([data, ...clienteList]);
    setPageState("LIST");
  }

  function handleUpdate(data: ICliente) {
    setClienteList(
      clienteList.map((item) =>
        item.customerId === data.customerId ? data : item
      )
    );
    setPageState("LIST");
  }

  async function handleDelete(data: ICliente) {
    setClienteList(
      clienteList.filter((item) => item.customerId !== data.customerId)
    );
    const { success } = await brandsDelete(data.customerId);
    if (!success) setClienteList(clienteList);
  }

  async function getClientes() {
    const { success, data } = await customersList();
    if (success) setClienteList(data.items);
  }

  async function getTienas() {
    const { success, data } = await storesList();
    if (success) setTiendaList(data.items);
  }

  useEffect(() => {
    getClientes();
    getTienas();
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
              !clienteEdit && styles.block,
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
          onClick={() => generateReport(clienteList)}
        >
          DESCARGAR REPORTE
        </button>
      </div>
      <div className={styles.content}>
        {
          {
            EDIT: (
              <Edit
                handleUpdate={handleUpdate}
                edit={clienteEdit!}
                tiendas={tiendaList}
              />
            ),
            CREATE: <Create handleCreate={handleCreate} tiendas={tiendaList} />,
            LIST: (
              <List
                list={clienteList}
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
