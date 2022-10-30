import { Component, Match, Switch } from "solid-js";
import { For } from "solid-js";

import IPlugins from "../interface/PluginsInterface";

const Sidebar: Component<{
    choosePlugin: number;
    plugins: IPlugins;
    onClickPlugin: (id: number) => void;
}> = (props) => {
    return (
        <div
            class="border-black flex-shrink-0"
            style="width: 5rem; border-right: 1px solid;"
        >
            <For each={props.plugins}>
                {(plugin, i) => (
                    <Switch>
                        <Match when={i() === props.choosePlugin}>
                            <div
                                class="text-xs text-center font-bold bg-blue cursor-default"
                                style="height: 5rem; line-height: 5rem;"
                                onClick={() => props.onClickPlugin(i())}
                            >
                                {plugin.name}
                            </div>
                        </Match>

                        <Match when={true}>
                            <div
                                class="text-xs text-center hover-font-bold hover-bg-blue cursor-pointer"
                                style="height: 5rem; line-height: 5rem;"
                                onClick={() => props.onClickPlugin(i())}
                            >
                                {plugin.name}
                            </div>
                        </Match>
                    </Switch>
                )}
            </For>
        </div>
    );
};

export default Sidebar;
