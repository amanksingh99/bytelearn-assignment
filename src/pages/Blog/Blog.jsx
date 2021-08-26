import React, { useState, useContext, useEffect } from "react";
import styles from "./Blog.module.css";
import { useLocation, useHistory } from "react-router-dom";

import { UserContext } from "../../Context";

export default function Blog() {
    const [post, setPost] = useState({});
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [editMode, setEditMode] = useState(false);

    const { pathname } = useLocation();
    const id = pathname.split("/").pop().trim();

    const { posts, loading, updatePost, deletePost } = useContext(UserContext);

    const history = useHistory();
    useEffect(() => {
        if (localStorage.getItem("isLoggedIn") !== "true") {
            history.push("/login");
        }
    });

    useEffect(() => {
        const post = posts.find((post) => post.id === id);
        setPost(post);
        setTitle(post?.title);
        setContent(post?.content);
    }, [posts]);

    function handleSubmit() {
        const updatedPost = {
            id,
            title,
            content,
            createdAt: new Date().toLocaleDateString(),
        };
        updatePost(updatedPost);
        setEditMode(false);
    }

    function handleDelete() {
        deletePost(id);
        history.push("/");
    }

    return (
        <main>
            {loading || !post ? (
                <h3>Loading...</h3>
            ) : (
                <div className={`${styles.blogContainer} container`}>
                    <div className={styles.inline}>
                        {editMode ? (
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        ) : (
                            <h1>{post?.title}</h1>
                        )}
                        <div className="buttons">
                            <button
                                className={styles.editBtn}
                                onClick={() =>
                                    setEditMode((prevMode) => !prevMode)
                                }
                            >
                                edit
                            </button>
                            <button
                                className={styles.deleteBtn}
                                onClick={handleDelete}
                            >
                                delete
                            </button>
                        </div>
                    </div>

                    <small>Published on {post?.createdAt}</small>
                    <br />
                    {editMode ? (
                        <textarea
                            value={content}
                            rows="20"
                            onChange={(e) => setContent(e.target.value)}
                        />
                    ) : (
                        <p>{post?.content}</p>
                    )}
                    {editMode && (
                        <button
                            className={styles.updateBtn}
                            onClick={handleSubmit}
                        >
                            Update
                        </button>
                    )}
                    {editMode && (
                        <button
                            className={styles.cancelBtn}
                            onClick={() => setEditMode(false)}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            )}
        </main>
    );
}
