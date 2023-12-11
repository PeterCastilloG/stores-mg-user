import { Table } from "@/shared/components/table/table";
import { IMarca } from "../../interfaces/marcas.interfaces";
import styles from "./list.module.scss";
import { useState } from "react";

export function List({
  list,
  handleEdit,
  handleDelete,
}: {
  list: Array<IMarca>;
  handleEdit: (data: IMarca) => void;
  handleDelete: (data: IMarca) => void;
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
          {
            nombre: "Contacto",
            propertie: "contact",
          },
        ]}
      />
    </div>
  );
}
