import { useForm } from "react-hook-form";
import styles from "./edit.module.scss";
import { clsx } from "@/shared/lib/clx";
import {
  IAlmacen,
  IAlmacenUpdate,
} from "../../interfaces/almacenes.interfaces";
import { storesUpate } from "@/shared/services/store.service";
import { toast } from "react-toastify";
import { warehousesUpate } from "@/shared/services/warehouse.service";

export function Edit({
  handleUpdate,
  edit,
}: {
  handleUpdate: (data: IAlmacen) => void;
  edit: IAlmacen;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      warehouseId: edit.warehouseId,
      name: edit.name,
      description: edit.description,
    },
  });

  async function handleSumit(info: IAlmacenUpdate) {
    const { success, data } = await warehousesUpate({
      ...info,
      warehouseId: edit.warehouseId,
    });
    if (success) handleUpdate(data.item);
    else toast.error("Ocurrio un fallo al guardar");
  }

  return (
    <form onSubmit={handleSubmit(handleSumit)} className={styles.form}>
      <div className={clsx(errors.name && styles.errorfield)}>
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          id="name"
          placeholder="Ingresa nombre de la tienda"
          {...register("name", {
            required: {
              value: true,
              message: "Nombre es requerido",
            },
          })}
        />
        <span className={styles.error}>
          {errors.name && errors.name.message}
        </span>
      </div>
      <div className={clsx(errors.description && styles.errorfield)}>
        <label htmlFor="description">Descripcion</label>
        <input
          type="description"
          id="description"
          placeholder="Ingresa descripcion"
          {...register("description", {
            required: {
              value: true,
              message: "Descripcion es requerido",
            },
          })}
        />
        <span className={styles.error}>
          {errors.description && errors.description.message}
        </span>
      </div>
      <button>GUARDAR</button>
    </form>
  );
}
