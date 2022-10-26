import type { Component } from "solid-js";
import { invoke } from "@tauri-apps/api";

import Navbar from "./main/Navbar";
import Request from "./main/Request";

const Main: Component = () => {
    invoke("rest", { method: "post", url: "http://httpbin.org/post" }).then(
        (response) => console.log(response)
    );

    return (
        <div class="flex-grow-1">
            <Navbar />
            <Request />
        </div>
    );
};

export default Main;
