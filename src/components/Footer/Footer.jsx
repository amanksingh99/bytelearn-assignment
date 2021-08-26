import React from "react";
import styles from "./Footer.module.css";
export default function Footer() {
    return (
        <footer className={styles.footer}>
            <p>
                &copy; 2021{" "}
                <span className={styles["text-accent"]}>bytelearn</span>{" "}
                assignment by{" "}
                <span className={styles["text-accent"]}> Aman Kumar Singh</span>
            </p>
        </footer>
    );
}
