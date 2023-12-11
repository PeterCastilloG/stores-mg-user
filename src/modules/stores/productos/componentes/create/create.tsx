import { useForm } from "react-hook-form";
import styles from "./create.module.scss";
import { clsx } from "@/shared/lib/clx";
import {
  IProducto,
  IProductoCreate,
} from "../../interfaces/productos.interfaces";
import { toast } from "react-toastify";
import { productsCreate } from "@/shared/services/product.service";
import { IMarca } from "@/modules/stores/marcas/interfaces/marcas.interfaces";
import { ICategoria } from "@/modules/stores/categorias/interfaces/categorias.interfaces";

export function Create({
  handleCreate,
  marcas,
  categorias,
}: {
  handleCreate: (data: IProducto) => void;
  marcas: Array<IMarca>;
  categorias: Array<ICategoria>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      medida: "",
      description: "",
      quantity: 0,
      brandId: 0,
      categoryId: 0,
    },
  });

  async function handleSumit(info: IProductoCreate) {
    const { success, data } = await productsCreate(info);
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
      <div className={clsx(errors.medida && styles.errorfield)}>
        <label htmlFor="name">Medida</label>
        <input
          type="text"
          id="medida"
          placeholder="Ingresa nombre de la tienda"
          {...register("medida", {
            required: {
              value: true,
              message: "Medida es requerido",
            },
          })}
        />
        <span className={styles.error}>
          {errors.medida && errors.medida.message}
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
      <div className={clsx(errors.brandId && styles.errorfield)}>
        <label htmlFor="brandId">Marca</label>
        <select
          id="brandId"
          placeholder="Ingresa nombre de la tienda"
          {...register("brandId", {
            required: {
              value: true,
              message: "Marca es requerido",
            },
            validate: (value) => {
              return value !== 0 || "Marca es requerido";
            },
            valueAsNumber: true,
          })}
        >
          <option value="0" disabled selected>
            Selecciona{" "}
          </option>
          {marcas.map((item) => (
            <option value={item.brandId} key={item.brandId}>
              {item.name}
            </option>
          ))}
        </select>
        <span className={styles.error}>
          {errors.brandId && errors.brandId.message}
        </span>
      </div>
      <div className={clsx(errors.categoryId && styles.errorfield)}>
        <label htmlFor="categoryId">Categoria</label>
        <select
          id="categoryId"
          placeholder="Ingresa nombre de la tienda"
          {...register("categoryId", {
            required: {
              value: true,
              message: "Categoria es requerido",
            },
            validate: (value) => {
              return value !== 0 || "Categoria es requerido";
            },
            valueAsNumber: true,
          })}
        >
          <option value="0" disabled selected>
            Selecciona{" "}
          </option>
          {categorias.map((item) => (
            <option value={item.categoryId} key={item.categoryId}>
              {item.name}
            </option>
          ))}
        </select>
        <span className={styles.error}>
          {errors.categoryId && errors.categoryId.message}
        </span>
      </div>
      <button>GUARDAR</button>
    </form>
  );
}
