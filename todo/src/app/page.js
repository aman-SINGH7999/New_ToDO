import styles from "./page.module.css";
import Image from "next/image";
import logo from "../../public/todo-logo.png"
import Sidebar from "./sidebar/page";
import Textarea from "./textarea/page";


export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.logo}>
        <Image 
          src={logo}
          height={50}
          width={50}
          alt="logo"
        />
        <h4>TODO</h4>
      </div>
      <div className={styles.container}>
          <Sidebar />
          <Textarea />
      </div>
    </main>
  );
}
