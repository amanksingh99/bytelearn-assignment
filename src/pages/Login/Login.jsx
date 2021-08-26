import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../../Context";
export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { signIn } = useContext(UserContext);
    const history = useHistory();
    const handleSignIn = (e) => {
        e.preventDefault();
        signIn();
        history.push("/");
    };

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (isLoggedIn === "true") {
            history.push("/");
        }
    }, []);

    return (
        <main>
            <form onSubmit={handleSignIn} className="container    ">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <br />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button type="submit">Login</button>
            </form>
        </main>
    );
}
