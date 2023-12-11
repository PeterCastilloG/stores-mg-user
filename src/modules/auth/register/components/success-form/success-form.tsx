import Link from "next/link";
import styles from "./success-form.module.scss";
export default function SuccessForm() {
  return (
    <div className={styles.container}>
      <h1>Felicidades</h1>
      <p>
        Se ha creado el ususario con exito, es un gusto tenerte como parte de
        nuestra familia, EXITOS.
      </p>
      <Link href={"/login"}>INICIAR SESION</Link>
    </div>
  );
}
