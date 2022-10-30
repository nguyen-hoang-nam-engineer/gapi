import { Component, createSignal } from "solid-js";

import Sidebar from "./components/Sidebar";
import Explorer from "./components/Explorer";
import Main from "./components/Main";
import { invoke } from "@tauri-apps/api";

import IPlugins from "./interface/PluginsInterface";

const App: Component = () => {
    const [plugins, setPlugins] = createSignal([{ name: "", value: "" }]);
    const [choosePlugin, setChoosePlugin] = createSignal(0);

    const onClickSidebarPlugin = (id: number) => {
        setChoosePlugin(id);
    };

    invoke("get_plugins", {})
        .then((v: IPlugins) => {
            setPlugins(v);
        })
        .catch((e) => {
            console.log(e);
        });

    return (
        <div class="h-screen flex bg-amber">
            <Sidebar
                plugins={plugins()}
                choosePlugin={choosePlugin()}
                onClickPlugin={onClickSidebarPlugin}
            />
            <Explorer />
            <Main plugins={plugins()} choosePlugin={choosePlugin()} />
        </div>
    );
};

export default App;
