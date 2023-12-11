import Link from "next/link";
import styles from "./success-form.module.scss";
export default function SuccessForm() {
  return (
    <div className={styles.container}>
      <h1>¡Se envio el correo!</h1>
      <p>
        Se ha enviado el correo de no llegar en unos momentos, por favor intente
        nuevamente en unos instantes. Si el error persiste contacte a nuestro
        soporte en línea.
      </p>
      <Link href={"/r/login"}>INICIAR SESION</Link>
    </div>
  );
}
