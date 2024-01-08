'use client';

import Link from "next/link";
import Illustration from "@/components/Illustration";
import styles from "@/styles/HomePage.module.css";

export default function page() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.background}>
          <h1>I NEED</h1>
          <h1>COFFEE</h1>
        </div>
        <div className={styles.foreground}>
          <div className={styles.content}>
            <h1 className={styles.name}>Farhan Ramadhan</h1>
            <h6 className={styles.bio}>Back End Developer</h6>
            <Link href="/projects">
              <button className={styles.button}>View Work</button>
            </Link>
            <Link href="/contact">
              <button className={styles.outlined}>Contact Me</button>
            </Link>
            <h6 className={styles.donate}>Btw, you can donate me :)</h6>
            <Link href="/donate">
              <button className={styles.button}>Donate</button>
            </Link>
          </div>
          <Illustration className={styles.illustration} />
        </div>
      </div>
    </>
  );
}