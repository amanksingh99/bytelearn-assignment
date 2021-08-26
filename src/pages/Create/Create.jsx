import React, { useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { UserContext } from "../../Context";

import styles from "./Create.module.css";

import { useHistory } from "react-router-dom";

export default function Create() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const { addPost } = useContext(UserContext);

    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem("isLoggedIn") !== 'true') {
            history.push("/login");
        }
    }, []);

    const handleSunmit = function (e) {
        e.preventDefault();
        if (title === "" || content === "") {
            return;
        }
        const postData = {
            id: uuidv4(),
            title,
            content,
            createdAt: new Date().toLocaleDateString(),
        };
        addPost(postData);
        history.push("/");
    };
    return (
        <main>
            <form
                className={`${styles.form} container`}
                onSubmit={handleSunmit}
            >
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    value={title}
                    id="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor="content">Content</label>
                <textarea
                    value={content}
                    rows="20"
                    required
                    onChange={(e) => setContent(e.target.value)}
                />
                <button className={styles.btnSubmit} type="submit">
                    Submit
                </button>
            </form>
        </main>
    );
}
