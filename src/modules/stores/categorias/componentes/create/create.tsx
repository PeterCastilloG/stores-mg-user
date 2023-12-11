import { useForm } from "react-hook-form";
import styles from "./create.module.scss";
import { clsx } from "@/shared/lib/clx";
import {
  ICategoria,
  ICategoriaCreate,
} from "../../interfaces/categorias.interfaces";
import { toast } from "react-toastify";
import { categoriesCreate } from "@/shared/services/categories.service";

export function Create({
  handleCreate,
}: {
  handleCreate: (data: ICategoria) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function handleSumit(info: ICategoriaCreate) {
    const { success, data } = await categoriesCreate(info);
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
