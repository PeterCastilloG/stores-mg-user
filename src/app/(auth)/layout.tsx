import styles from "./layout.module.scss";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <section className={styles.main}>{children}</section>
        <footer className={styles.footer}>
          <span>@2023 UtpAlumnos. Todos los derechos reservador</span>
          <ul>
            <li>
              <Link href={""}>Inicio</Link>
            </li>
            <li>
              <Link href={""}>Soporte</Link>
            </li>
            <li>
              <Link href={""}>Terminos y condiciones</Link>
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
}
