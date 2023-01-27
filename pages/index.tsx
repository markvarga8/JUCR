import Head from "next/head";
import styles from "../styles/Home.module.css";
import Countries from "@/components/Repositories";

export default function ClientSide() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Countries />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
