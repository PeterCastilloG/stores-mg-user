import ReactDOM from "react-dom";
import React from "react";
import styles from "./Modal.module.scss";
import { clsx } from "@/shared/lib/clx";

export default function Modal({
  children,
  show,
}: {
  children: React.ReactNode;
  show: boolean;
}) {
  const [domReady, setDomReady] = React.useState(false);
  React.useEffect(() => {
    setDomReady(true);
  }, []);
  return domReady
    ? ReactDOM.createPortal(
        <div className={clsx(styles.modal, !show && styles.noshow)}>
          {children}
        </div>,
        document.getElementById("modal")!
      )
    : null;
}
