import type { Component } from "solid-js";
import { For } from "solid-js";

const Sidebar: Component = () => {
    const plugins = ["REST", "GraphQL", "Websocket", "SSE", "GRPC"];

    return (
        <div class="border-black" style="width: 5rem; border-right: 1px solid;">
            <For each={plugins}>
                {(plugin, _) => (
                    <div
                        class="text-xs text-center hover-font-bold hover-bg-blue"
                        style="height: 5rem; line-height: 5rem;"
                    >
                        {plugin}
                    </div>
                )}
            </For>
        </div>
    );
};

export default Sidebar;
