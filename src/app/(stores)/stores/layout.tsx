import { SideBar } from "@/shared/components/sidebar/sidebar";
import styles from "./layout.module.scss";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <SideBar />
      </div>
      <div className={styles.wrapper}>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
