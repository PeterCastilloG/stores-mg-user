"use client";
import styles from "./login.page.module.scss";
import LoginForm from "./components/login-form/login-form";
import { useState } from "react";
import Loader from "@/shared/components/loader/loader";
import ErrorForm from "./components/error-form/error-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [pageState, setPageState] = useState<"LOGIN" | "LOADING" | "ERROR">(
    "LOGIN"
  );

  async function handleLogin(form: { email: string; password: string }) {
    setPageState("LOADING");
    const response = await signIn("credentials", {
      ...form,
      redirect: false,
    });
    if (response && response.ok) {
      router.push("/stores");
    } else {
      setPageState("ERROR");
    }
  }

  function newTry() {
    setPageState("LOGIN");
  }

  return (
    <div className={styles.container}>
      {
        {
          LOGIN: <LoginForm handleLogin={handleLogin} />,
          LOADING: <Loader />,
          ERROR: <ErrorForm newTry={newTry} />,
        }[pageState]
      }
    </div>
  );
}
