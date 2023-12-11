import { Table } from "@/shared/components/table/table";
import { ICliente } from "../../interfaces/cliente.interfaces";
import styles from "./list.module.scss";
import { useState } from "react";

export function List({
  list,
  handleEdit,
  handleDelete,
}: {
  list: Array<ICliente>;
  handleEdit: (data: ICliente) => void;
  handleDelete: (data: ICliente) => void;
}) {
  const [page, setPage] = useState(0);

  return (
    <div className={styles.container}>
      <Table
        list={list.map((item) => ({ ...item, store_name: item.store.name }))}
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
            nombre: "Email",
            propertie: "email",
          },
          {
            nombre: "Contraseña",
            propertie: "password",
          },
          {
            nombre: "Tienda",
            propertie: "store_name",
          },
        ]}
      />
    </div>
  );
}
