import React from "react";

import styles from "./Post.module.css";
import { Link } from "react-router-dom";

export default function Post({ data }) {
    return (
        <>
            {data && (
                <Link className={styles.link} to={`/blog/${data.id}`}>
                    <div className={styles.post}>
                        <h2>{data.title}</h2>
                        <small>Published on {data.createdAt}</small>
                    </div>
                </Link>
            )}
        </>
    );
}
