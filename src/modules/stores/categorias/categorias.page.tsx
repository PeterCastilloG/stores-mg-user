"use client";
import { useEffect, useState } from "react";
import styles from "./categorias.page.module.scss";
import { ICategoria, TCategoriaState } from "./interfaces/categorias.interfaces";
import { Edit } from "./componentes/edit/edit";
import { Create } from "./componentes/create/create";
import { List } from "./componentes/list/list";
import { clsx } from "@/shared/lib/clx";
import { generateReport } from "@/shared/util/generate-report";
import { categoriesDelete, categoriesList } from "@/shared/services/categories.service";

export default function CategoriasPage() {
  const [pageState, setPageState] = useState<TCategoriaState>("LIST");
  const [categoriaList, setCategoriaList] = useState<Array<ICategoria>>([]);
  const [categoriaEdit, setCategoriaEdit] = useState<ICategoria>();

  function handleChangeTab(tab: TCategoriaState) {
    if (tab !== "EDIT") setCategoriaEdit(undefined);
    setPageState(tab);
  }

  function handleEdit(data: ICategoria) {
    setCategoriaEdit(data);
    setPageState("EDIT");
  }

  function handleCreate(data: ICategoria) {
    setCategoriaList([data, ...categoriaList]);
    setPageState("LIST");
  }

  function handleUpdate(data: ICategoria) {
    setCategoriaList(
      categoriaList.map((item) =>
        item.categoryId === data.categoryId ? data : item
      )
    );
    setPageState("LIST");
  }

  async function handleDelete(data: ICategoria) {
    setCategoriaList(
      categoriaList.filter((item) => item.categoryId !== data.categoryId)
    );
    const { success } = await categoriesDelete(data.categoryId);
    if (!success) setCategoriaList(categoriaList);
  }

  async function getCategorias() {
    const { success, data } = await categoriesList();
    if (success) setCategoriaList(data.items);
  }

  useEffect(() => {
    getCategorias();
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
              !categoriaEdit && styles.block,
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
          onClick={() => generateReport(categoriaList)}
        >
          DESCARGAR REPORTE
        </button>
      </div>
      <div className={styles.content}>
        {
          {
            EDIT: <Edit handleUpdate={handleUpdate} edit={categoriaEdit!} />,
            CREATE: <Create handleCreate={handleCreate} />,
            LIST: (
              <List
                list={categoriaList}
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
