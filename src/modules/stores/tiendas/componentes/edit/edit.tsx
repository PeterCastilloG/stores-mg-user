import { useForm } from "react-hook-form";
import styles from "./edit.module.scss";
import { clsx } from "@/shared/lib/clx";
import { ITienda, ITiendaUpdate } from "../../interfaces/tiendas.interfaces";
import { storesUpate } from "@/shared/services/store.service";
import { toast } from "react-toastify";

export function Edit({
  handleUpdate,
  edit,
}: {
  handleUpdate: (data: ITienda) => void;
  edit: ITienda;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      storeId: edit.storeId,
      name: edit.name,
      contact: edit.contact,
      description: edit.description,
    },
  });

  async function handleSumit(info: ITiendaUpdate) {
    const { success, data } = await storesUpate({
      ...info,
      storeId: edit.storeId,
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
      <div className={clsx(errors.contact && styles.errorfield)}>
        <label htmlFor="contact">Contacto de referencia</label>
        <input
          type="string"
          id="contact"
          placeholder="Ingresa contacto de referencia"
          {...register("contact", {
            required: {
              value: true,
              message: "Contacto es requerido",
            },
          })}
        />
        <span className={styles.error}>
          {errors.contact && errors.contact.message}
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
