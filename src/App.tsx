import type { Component } from "solid-js";

import Sidebar from "./components/Sidebar";
import Explorer from "./components/Explorer";
import Main from "./components/Main";

const App: Component = () => {
    return (
        <div class="h-screen flex bg-amber">
            <Sidebar />
            <Explorer />
            <Main />
        </div>
    );
};

export default App;
