import { Switch, Route } from "react-router-dom";

//components
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

//pages
import Home from "./pages/Home/Home";
import Create from "./pages/Create/Create";
import Blog from "./pages/Blog/Blog";
import Login from "./pages/Login/Login";

function App() {
    return (
        <>
            <Header />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/new">
                    <Create />
                </Route>
                <Route path="/blog/:id">
                    <Blog />
                </Route>
            </Switch>
            <Footer/>
        </>

    );
}

export default App;
