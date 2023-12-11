import { Table } from "@/shared/components/table/table";
import { ICategoria } from "../../interfaces/categorias.interfaces";
import styles from "./list.module.scss";
import { useState } from "react";

export function List({
  list,
  handleEdit,
  handleDelete,
}: {
  list: Array<ICategoria>;
  handleEdit: (data: ICategoria) => void;
  handleDelete: (data: ICategoria) => void;
}) {
  const [page, setPage] = useState(0);
  
  return (
    <div className={styles.container}>
      <Table
        list={list}
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
            nombre: "Descripción",
            propertie: "description",
          },
        ]}
      />
    </div>
  );
}
