import styles from "./error-form.module.scss";
export default function ErrorForm({ newTry }: { newTry: () => void }) {
  return (
    <div className={styles.container}>
      <h1>Falla en el registrar usuario</h1>
      <p>
        Se ha detectado un error en el registro de nuestra plataforma, por favor
        intente nuevamente en unos instantes. Si el error persiste contacte a
        nuestro soporte en línea.
      </p>
      <button onClick={newTry}>Intentar nuevamente </button>
    </div>
  );
}
