import { clsx } from "@/shared/lib/clx";
import styles from "./register-form.module.scss";
import { useForm } from "react-hook-form";
import Link from "next/link";

export default function RegisterForm({
  handleRegister,
}: {
  handleRegister: ({
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => void;
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  return (
    <div className={styles.container}>
      <h1>Registro</h1>
      <form onSubmit={handleSubmit(handleRegister)} className={styles.form}>
        <div className={clsx(errors.name && styles.errorfield)}>
          <label htmlFor="email">Nombre</label>
          <input
            type="text"
            id="name"
            placeholder="Ingresa tu nombre"
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
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="Ingresa tu direccion de email"
            {...register("email", {
              required: {
                value: true,
                message: "Email es requerido",
              },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Email no valido",
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
            type="password"
            id="password"
            placeholder="Ingresa tu contraseña"
            {...register("password", {
              required: {
                value: true,
                message: "Contraseña es requerida",
              },
            })}
          />
          <span className={styles.error}>
            {errors.password && errors.password.message}
          </span>
        </div>
        <button>REGISTRAME</button>
      </form>
      <div className={styles.no_account}>
        <span>¿Ya tiene cuenta?</span>
        <Link href={"/login"}>Inicia sesión</Link>
      </div>
    </div>
  );
}
