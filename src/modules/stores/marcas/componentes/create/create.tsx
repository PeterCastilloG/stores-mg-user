import { useForm } from "react-hook-form";
import styles from "./create.module.scss";
import { clsx } from "@/shared/lib/clx";
import { IMarca, IMarcaCreate } from "../../interfaces/marcas.interfaces";
import { toast } from "react-toastify";
import { categoriesCreate } from "@/shared/services/categories.service";
import { brandsCreate } from "@/shared/services/brand.service";

export function Create({
  handleCreate,
}: {
  handleCreate: (data: IMarca) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      contact: "",
      description: "",
    },
  });

  async function handleSumit(info: IMarcaCreate) {
    const { success, data } = await brandsCreate(info);
    if (success) handleCreate(data.item);
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
