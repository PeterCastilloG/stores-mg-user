import { useForm } from "react-hook-form";
import styles from "./product-history-create.module.scss";
import { clsx } from "@/shared/lib/clx";
import {
  IProductHistory,
  IProductoHistoryCreate,
} from "../../interfaces/productos.interfaces";
import { toast } from "react-toastify";
import { IAlmacen } from "@/modules/stores/almacenes/interfaces/almacenes.interfaces";
import { productHistoriesCreate } from "@/shared/services/product-history.service";

export function ProductHistoryCreate({
  handleCreate,
  almacenes,
  productId,
}: {
  handleCreate: (data: IProductHistory) => void;
  almacenes: Array<IAlmacen>;
  productId: number;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      productId: productId,
      used: 0,
      quantity: 0,
      expiryDate: "",
      warehouseId: 0,
    },
  });

  async function handleSumit(info: IProductoHistoryCreate) {
    const { success, data, kindMessage } = await productHistoriesCreate(info);
    if (success) handleCreate(data.item);
    else toast.error(kindMessage ?? "Ocurrio un fallo al guardar");
  }

  return (
    <form onSubmit={handleSubmit(handleSumit)} className={styles.form}>
      <div className={clsx(errors.expiryDate && styles.errorfield)}>
        <label htmlFor="expiryDate">Fecha de expiración</label>
        <input
          type="date"
          id="expiryDate"
          placeholder="Ingresa fecha de expiracion"
          {...register("expiryDate", {
            required: {
              value: true,
              message: "Fecha es requerido",
            },
          })}
        />
        <span className={styles.error}>
          {errors.expiryDate && errors.expiryDate.message}
        </span>
      </div>
      <div className={clsx(errors.quantity && styles.errorfield)}>
        <label htmlFor="quantity">Cantidad total</label>
        <input
          type="number"
          id="quantity"
          placeholder="Ingresa cantidad total"
          {...register("quantity", {
            required: {
              value: true,
              message: "Cantidad total es requerido",
            },
            valueAsNumber: true,
          })}
        />
        <span className={styles.error}>
          {errors.quantity && errors.quantity.message}
        </span>
      </div>
      <div className={clsx(errors.used && styles.errorfield)}>
        <label htmlFor="used">Cantidad usada</label>
        <input
          type="number"
          id="used"
          placeholder="Ingresa cantidad usada"
          {...register("used", {
            required: {
              value: true,
              message: "Cantidad usada es requerido",
            },
            valueAsNumber: true,
          })}
        />
        <span className={styles.error}>
          {errors.used && errors.used.message}
        </span>
      </div>
      <div className={clsx(errors.warehouseId && styles.errorfield)}>
        <label htmlFor="warehouseId">Almacen</label>
        <select
          id="warehouseId"
          {...register("warehouseId", {
            required: {
              value: true,
              message: "Almacen es requerido",
            },
            validate: (value) => {
              return value !== 0 || "Almacen es requerido";
            },
            valueAsNumber: true,
          })}
        >
          <option value="0" disabled hidden>
            Selecciona{" "}
          </option>
          {almacenes.map((item) => (
            <option value={item.warehouseId} key={item.warehouseId}>
              {item.name}
            </option>
          ))}
        </select>
        <span className={styles.error}>
          {errors.warehouseId && errors.warehouseId.message}
        </span>
      </div>
      <button>GUARDAR</button>
    </form>
  );
}
