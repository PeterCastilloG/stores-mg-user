import { clsx } from "@/shared/lib/clx";
import styles from "./login-form.module.scss";
import { useForm } from "react-hook-form";
import Link from "next/link";

export default function LoginForm({
  handleLogin,
}: {
  handleLogin: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className={styles.container}>
      <h1>Inisio de session</h1>
      <form onSubmit={handleSubmit(handleLogin)} className={styles.form}>
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
        {/* <span className={styles.forgot_password}>
          <Link href={"/recovery-password"}>¿Olvidaste tu contraseña?</Link>
        </span> */}
        <button>INICIAR SESION</button>
      </form>
      <div className={styles.no_account}>
        <span>¿No tienes una cuenta aún?</span>
        <Link href={"/register"}>Regitrate</Link>
      </div>
    </div>
  );
}
