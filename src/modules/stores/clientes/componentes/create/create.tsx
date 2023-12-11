import { useForm } from "react-hook-form";
import styles from "./create.module.scss";
import { clsx } from "@/shared/lib/clx";
import { ICliente, IClienteCreate } from "../../interfaces/cliente.interfaces";
import { toast } from "react-toastify";
import { ITienda } from "@/modules/stores/tiendas/interfaces/tiendas.interfaces";
import { customersCreate } from "@/shared/services/customer.service";

export function Create({
  handleCreate,
  tiendas
}: {
  handleCreate: (data: ICliente) => void;
  tiendas: Array<ITienda>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      storeId: 0,
    },
  });

  async function handleSumit(info: IClienteCreate) {
    const { success, data } = await customersCreate(info);
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
      <div className={clsx(errors.email && styles.errorfield)}>
        <label htmlFor="email">Correo</label>
        <input
          type="text"
          id="email"
          placeholder="Ingresa correo"
          {...register("email", {
            required: {
              value: true,
              message: "Correo es requerido",
            },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Nombre no valido",
            },
          })}
        />
        <span className={styles.error}>
          {errors.email && errors.email.message}
        </span>
      </div>
      <div className={clsx(errors.password && styles.errorfield)}>
        <label htmlFor="password">Contraseña</label>
        <input
          type="text"
          id="password"
          placeholder="Ingresa contraseña"
          {...register("password", {
            required: {
              value: true,
              message: "Contraseña es requerido",
            },
          })}
        />
        <span className={styles.error}>
          {errors.password && errors.password.message}
        </span>
      </div>
      <div className={clsx(errors.storeId && styles.errorfield)}>
        <label htmlFor="brandId">Tienda</label>
        <select
          id="brandId"
          placeholder="Ingresa nombre de la tienda"
          {...register("storeId", {
            required: {
              value: true,
              message: "Tienda es requerido",
            },
            validate: (value) => {
              return value !== 0 || "Tienda es requerido";
            },
            valueAsNumber: true,
          })}
        >
          <option value="0" hidden>
            Selecciona{" "}
          </option>
          {tiendas.map((item) => (
            <option value={item.storeId} key={item.storeId}>
              {item.name}
            </option>
          ))}
        </select>
        <span className={styles.error}>
          {errors.storeId && errors.storeId.message}
        </span>
      </div>
      <button>GUARDAR</button>
    </form>
  );
}
