import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

function UserContextProvider(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    //initial loading
    useEffect(() => {
        const savedPosts = JSON.parse(localStorage.getItem("posts"));
        const loginInfo = localStorage.getItem("isLoggedIn");
        if (savedPosts) {
            setPosts(savedPosts);
        }
        if (loginInfo === "true") {
            setIsLoggedIn(true);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("posts", JSON.stringify(posts));
        setLoading(false);
    }, [posts]);

    const addPost = (post) => {
        setLoading(true);
        setPosts((prevPosts) => {
            const newPostArray = [...prevPosts, post];
            return newPostArray;
        });
    };

    const updatePost = (updatedPost) => {
        setLoading(true);
        setPosts((prevPosts) => {
            const updatedArr = prevPosts.filter((post) => {
                // console.log(post?.id, updatePost.id);
                return post.id !== updatedPost.id;
            });

            return [...updatedArr, updatedPost];
        });
    };

    const signIn = () => {
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
    };

    const signOut = () => {
        localStorage.setItem("isLoggedIn", "false");
        setIsLoggedIn(false);
    };

    const deletePost = (id) => {
        setLoading(true);
        setPosts((prevPosts) => {
            return prevPosts.filter((post) => post.id !== id);
        });
    };

    return (
        <UserContext.Provider
            value={{
                isLoggedIn,
                signIn,
                signOut,
                posts,
                addPost,
                updatePost,
                deletePost,
                loading,
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
}

export { UserContextProvider, UserContext };
