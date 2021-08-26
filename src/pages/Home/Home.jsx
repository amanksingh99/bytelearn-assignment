import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styles from "./Home.module.css";

import Post from "../../components/Post/Post";

import { UserContext } from "../../Context";

export default function Home() {
    const { posts, loading } = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (isLoggedIn === "false" || !isLoggedIn) {
            history.push("/login");
            return;
        }
    }, []);

    return (
        <main>
            <h1 className={styles.Heading}>Welcome Back!</h1>
            {loading ? (
                <h3>Loading...</h3>
            ) : (
                <div className="container">
                    {posts
                        .sort(
                            (a, b) =>
                                new Date(a.createdAt) - new Date(b.createdAt)
                        )
                        .map((post) => (
                            <Post key={post.id} data={post} />
                        ))}
                </div>
            )}
        </main>
    );
}
