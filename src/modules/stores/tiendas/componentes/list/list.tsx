import { Table } from "@/shared/components/table/table";
import { ITienda } from "../../interfaces/tiendas.interfaces";
import styles from "./list.module.scss";
import { useState } from "react";

export function List({
  list,
  handleEdit,
  handleDelete
}: {
  list: Array<ITienda>;
  handleEdit: (data: ITienda) => void;
  handleDelete: (data: ITienda) => void;
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
            nombre: "Contacto",
            propertie: "contact",
          },
          {
            nombre: "Descripcion",
            propertie: "description",
          },
        ]}
      />
    </div>
  );
}
