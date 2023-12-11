import { useForm } from "react-hook-form";
import styles from "./recovery-password-form.module.scss";
import { clsx } from "@/shared/lib/clx";
import Link from "next/link";

export default function RecoveryPasswordForm({
  handleRecovery,
}: {
  handleRecovery: ({ email }: { email: string }) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  return (
    <div className={styles.container}>
      <h1>Recupera tu contraseña</h1>
      <form onSubmit={handleSubmit(handleRecovery)} className={styles.form}>
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
        <button>RECUPERAR CONTRASEÑA</button>
      </form>
      <div className={styles.no_account}>
        <span>¿Recuperaste tu contraseña?</span>
        <Link href={"/r/login"}>Inicia sesión</Link>
      </div>
    </div>
  );
}
