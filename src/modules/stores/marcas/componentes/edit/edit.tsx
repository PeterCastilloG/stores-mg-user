import { useForm } from "react-hook-form";
import styles from "./edit.module.scss";
import { clsx } from "@/shared/lib/clx";
import { IMarca, IMarcaUpdate } from "../../interfaces/marcas.interfaces";
import { toast } from "react-toastify";
import { brandsUpate } from "@/shared/services/brand.service";

export function Edit({
  handleUpdate,
  edit,
}: {
  handleUpdate: (data: IMarca) => void;
  edit: IMarca;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      brandId: edit.brandId,
      name: edit.name,
      description: edit.description,
      contact: edit.contact,
    },
  });

  async function handleSumit(info: IMarcaUpdate) {
    const { success, data } = await brandsUpate({
      ...info,
      brandId: edit.brandId,
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
        <label htmlFor="contact">Contacto</label>
        <input
          type="contact"
          id="contact"
          placeholder="Ingresa Contacto"
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
