"use client";
import { useState } from "react";
import styles from "./recovery-password.page.module.scss";
import SuccessForm from "./components/success-form/success-form";
import ErrorForm from "./components/error-form/error-form";
import RecoveryPasswordForm from "./components/recovery-password-form/recovery-password-form";
import Loader from "@/shared/components/loader/loader";

export default function RecoveryPasswordPage() {
  const [pageState, setPageState] = useState<
    "RECOVERY" | "LOADING" | "ERROR" | "SUCCESS"
  >("RECOVERY");

  function handleRecovery(form: { email: string }) {
    setPageState("LOADING");
    setTimeout(() => {
      if (form.email !== "peterjackcc@gmail.com") {
        return setPageState("ERROR");
      }
      setPageState("SUCCESS");
    }, 3000);
  }

  function newTry() {
    setPageState("RECOVERY");
  }

  return (
    <div className={styles.container}>
      {
        {
          RECOVERY: <RecoveryPasswordForm handleRecovery={handleRecovery}/>,
          LOADING: <Loader />,
          ERROR: <ErrorForm newTry={newTry} />,
          SUCCESS: <SuccessForm />,
        }[pageState]
      }
    </div>
  );
}
