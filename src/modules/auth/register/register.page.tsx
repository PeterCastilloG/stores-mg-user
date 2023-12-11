"use client";
import { useState } from "react";
import styles from "./register.page.module.scss";
import RegisterForm from "./components/register-form/register-form";
import Loader from "@/shared/components/loader/loader";
import ErrorForm from "./components/error-form/error-form";
import SuccessForm from "./components/success-form/success-form";
import { assert } from "console";
import { registerUser } from "@/shared/services/auth.service";

export default function RegisterPage() {
  const [pageState, setPageState] = useState<
    "REGISTER" | "LOADING" | "SUCCESS" | "ERROR"
  >("REGISTER");

  async function handleRegister(form: {
    name: string;
    email: string;
    password: string;
  }) {
    setPageState("LOADING");
    const {success } = await registerUser(form)
    if(success) setPageState('SUCCESS')
    else setPageState('ERROR')
  }

  function newTry() {
    setPageState("REGISTER");
  }
  return (
    <div className={styles.container}>
      {
        {
          REGISTER: <RegisterForm handleRegister={handleRegister} />,
          LOADING: <Loader />,
          ERROR: <ErrorForm newTry={newTry} />,
          SUCCESS: <SuccessForm />,
        }[pageState]
      }
    </div>
  );
}
