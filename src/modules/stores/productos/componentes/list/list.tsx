import { Table } from "@/shared/components/table/table";
import { IProducto } from "../../interfaces/productos.interfaces";
import styles from "./list.module.scss";
import { useState } from "react";

export function List({
  list,
  handleEdit,
  handleDelete,
}: {
  list: Array<IProducto>;
  handleEdit: (data: IProducto) => void;
  handleDelete: (data: IProducto) => void;
}) {
  const [page, setPage] = useState(0);

  return (
    <div className={styles.container}>
      <Table
        list={list.map((item) => ({
          ...item,
          brand_name: item.brand.name,
          category_name: item.category.name,
        }))}
        page={page}
        setPage={setPage}
        handleEdit={handleEdit}
        handleDelete={(item) => {
          setPage(0);
          handleDelete(item);
        }}
        properties={[
          {
            nombre: "Nombre",
            propertie: "name",
          },
          {
            nombre: "Medida",
            propertie: "medida",
          },
          {
            nombre: "Cantidad",
            propertie: "quantity",
          },
          {
            nombre: "Descripcion",
            propertie: "description",
          },
          {
            nombre: "Marca",
            propertie: "brand_name",
          },
          {
            nombre: "Cateroria",
            propertie: "category_name",
          },
        ]}
      />
    </div>
  );
}
