import React, { useContext } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { UserContext } from "../../Context";
import styles from "./Header.module.css";

export default function Header() {
    const { signOut } = useContext(UserContext);
    const location = useLocation();
    const history = useHistory();
    function handleSignOut() {
        signOut();
        history.push("/login");
    }
    return (
        <header className={styles.header}>
            <nav className={`container ${styles.nav}`}>
                <Link className={styles.link} to="/">
                    home
                </Link>
                {localStorage.getItem("isLoggedIn") === "true" && (
                    <span className={styles.link} onClick={handleSignOut}>
                        logout
                    </span>
                )}
                {location.pathname === "/" && (
                    <Link className={styles.btnCreate} to="/new">
                        New Post
                    </Link>
                )}
            </nav>
        </header>
    );
}
