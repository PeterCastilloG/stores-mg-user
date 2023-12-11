"use client";
import { useEffect, useState } from "react";
import styles from "./productos.page.module.scss";
import { IProducto, TProductoState } from "./interfaces/productos.interfaces";
import { Edit } from "./componentes/edit/edit";
import { Create } from "./componentes/create/create";
import { List } from "./componentes/list/list";
import { clsx } from "@/shared/lib/clx";
import { generateReport } from "@/shared/util/generate-report";
import {
  productsDelete,
  productsList,
} from "@/shared/services/product.service";
import { categoriesList } from "@/shared/services/categories.service";
import { brandsList } from "@/shared/services/brand.service";
import { IMarca } from "../marcas/interfaces/marcas.interfaces";
import { ICategoria } from "../categorias/interfaces/categorias.interfaces";
import { IAlmacen } from "../almacenes/interfaces/almacenes.interfaces";
import { warehousesList } from "@/shared/services/warehouse.service";

export default function ProductosPage() {
  const [pageState, setPageState] = useState<TProductoState>("LIST");
  const [marcasList, setMarcasList] = useState<Array<IMarca>>([]);
  const [catergoriaList, setCategoriaList] = useState<Array<ICategoria>>([]);
  const [almacenList, setAlmacenList] = useState<Array<IAlmacen>>([])
  const [productoList, setProductoList] = useState<Array<IProducto>>([]);
  const [productoEdit, setProductoEdit] = useState<IProducto>();

  function handleChangeTab(tab: TProductoState) {
    if (tab !== "EDIT") setProductoEdit(undefined);
    setPageState(tab);
  }

  function handleEdit(data: IProducto) {
    setProductoEdit(data);
    setPageState("EDIT");
  }

  function handleCreate(tienda: IProducto) {
    setProductoList([tienda, ...productoList]);
    setPageState("LIST");
  }

  function handleUpdate(tienda: IProducto) {
    setProductoList(
      productoList.map((item) =>
        item.productId === tienda.productId ? tienda : item
      )
    );
    setPageState("LIST");
  }

  async function handleDelete(data: IProducto) {
    setProductoList(
      productoList.filter((item) => item.productId !== data.productId)
    );
    const { success } = await productsDelete(data.productId);
    if (!success) setProductoList(productoList);
  }

  async function getProductos() {
    const { success, data } = await productsList();
    if (success) setProductoList(data.items);
  }

  async function getCategorias() {
    const { success, data } = await categoriesList();
    if (success) setCategoriaList(data.items);
  }

  async function getMarcas() {
    const { success, data } = await brandsList();
    if (success) setMarcasList(data.items);
  }

  async function getAlmacenes() {
    const { success, data } = await warehousesList();
    if (success) setAlmacenList(data.items);
  }

  useEffect(() => {
    getProductos();
    getCategorias();
    getMarcas();
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
              !productoEdit && styles.block,
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
          onClick={() => generateReport(productoList)}
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
                edit={productoEdit!}
                categorias={catergoriaList}
                marcas={marcasList}
                almacenes={almacenList}
              />
            ),
            CREATE: (
              <Create
                handleCreate={handleCreate}
                categorias={catergoriaList}
                marcas={marcasList}
              />
            ),
            LIST: (
              <List
                list={productoList}
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
