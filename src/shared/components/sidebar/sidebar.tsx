"use client";
import { clsx } from "@/shared/lib/clx";
import styles from "./sidebar.module.scss";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiLogoutBoxLine } from "react-icons/ri";

export function SideBar() {
  const { data: session } = useSession();
  const location = usePathname();

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar_logo}>UTP STORES</div>
      <ul className={styles.sidebar_links}>
        <li className={clsx(location === "/stores/tiendas" && styles.active)}>
          <Link href={"/stores/tiendas"}>Tiendas</Link>
        </li>
        <li className={clsx(location === "/stores/almacenes" && styles.active)}>
          <Link href={"/stores/almacenes"}>Almacenes</Link>
        </li>
        <li className={clsx(location === "/stores/marcas" && styles.active)}>
          <Link href={"/stores/marcas"}>Marcas</Link>
        </li>
        <li className={clsx(location === "/stores/categorias" && styles.active)}>
          <Link href={"/stores/categorias"}>Categorias</Link>
        </li>
        <li className={clsx(location === "/stores/productos" && styles.active)}>
          <Link href={"/stores/productos"}>Productos</Link>
        </li>
        <li className={clsx(location === "/stores/clientes" && styles.active)}>
          <Link href={"/stores/clientes"}>Clientes</Link>
        </li>
      </ul>
      <div className={styles.sidebar_user}>
        <div>{session?.user.data.item.name.split("")[0]}</div>
        <span>{session?.user.data.item.name}</span>
        <RiLogoutBoxLine onClick={signOut} />
      </div>
    </div>
  );
}
