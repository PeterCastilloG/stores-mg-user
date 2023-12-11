"use client";
import { useEffect, useState } from "react";
import styles from "./marcas.page.module.scss";
import { IMarca, TMarcaState } from "./interfaces/marcas.interfaces";
import { Edit } from "./componentes/edit/edit";
import { Create } from "./componentes/create/create";
import { List } from "./componentes/list/list";
import { clsx } from "@/shared/lib/clx";
import { generateReport } from "@/shared/util/generate-report";
import {
  categoriesDelete,
} from "@/shared/services/categories.service";
import { brandsDelete, brandsList } from "@/shared/services/brand.service";

export default function MarcasPage() {
  const [pageState, setPageState] = useState<TMarcaState>("LIST");
  const [marcaList, setMarcaList] = useState<Array<IMarca>>([]);
  const [marcaEdit, setMarcaEdit] = useState<IMarca>();

  function handleChangeTab(tab: TMarcaState) {
    if (tab !== "EDIT") setMarcaEdit(undefined);
    setPageState(tab);
  }

  function handleEdit(data: IMarca) {
    setMarcaEdit(data);
    setPageState("EDIT");
  }

  function handleCreate(data: IMarca) {
    setMarcaList([data, ...marcaList]);
    setPageState("LIST");
  }

  function handleUpdate(data: IMarca) {
    setMarcaList(
      marcaList.map((item) => (item.brandId === data.brandId ? data : item))
    );
    setPageState("LIST");
  }

  async function handleDelete(data: IMarca) {
    setMarcaList(marcaList.filter((item) => item.brandId !== data.brandId));
    const { success } = await brandsDelete(data.brandId);
    if (!success) setMarcaList(marcaList);
  }

  async function getMarcas() {
    const { success, data } = await brandsList();
    if (success) setMarcaList(data.items);
  }

  useEffect(() => {
    getMarcas();
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
              !marcaEdit && styles.block,
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
          onClick={() => generateReport(marcaList)}
        >
          DESCARGAR REPORTE
        </button>
      </div>
      <div className={styles.content}>
        {
          {
            EDIT: <Edit handleUpdate={handleUpdate} edit={marcaEdit!} />,
            CREATE: <Create handleCreate={handleCreate} />,
            LIST: (
              <List
                list={marcaList}
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
