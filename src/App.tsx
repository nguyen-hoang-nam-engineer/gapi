import type { Component } from "solid-js";
import { invoke } from "@tauri-apps/api";

const App: Component = () => {
    invoke("greet", { name: "World" }).then((response) =>
        console.log(response)
    );

    return (
        <p class="text-4xl text-green-700 text-center py-20">
            Hi{" "}
            <a
                class="text-pink-600 hover:font-bold hover:border-1"
                href="https://antfu.me/posts/reimagine-atomic-css"
                target="atomic-css"
            >
                Atomic CSS
            </a>
            !
        </p>
    );
};

export default App;
