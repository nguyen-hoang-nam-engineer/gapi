import { Component, Setter } from "solid-js";

import { For, Switch, Match } from "solid-js";

import Select from "./navbar/Select";
import Input from "./navbar/Input";
import Send from "./navbar/Send";

import INavbarComponent from "../../interface/NavbarComponentsInterface";

const Navbar: Component<{
    metadata: Object;
    setMetadata: Setter<Object>;
    components: INavbarComponent;
    send: () => void;
}> = (props) => {
    return (
        <div class="flex gap-4">
            <For each={props.components.top}>
                {(componentsTop, _) => (
                    <Switch>
                        <Match when={componentsTop.kind === "SELECT"}>
                            <Select
                                value={componentsTop.value}
                                name={componentsTop.name}
                                metadata={props.metadata}
                                setMetadata={props.setMetadata}
                            />
                        </Match>

                        <Match when={componentsTop.kind === "INPUT"}>
                            <Input
                                name={componentsTop.name}
                                metadata={props.metadata}
                                setMetadata={props.setMetadata}
                            />
                        </Match>
                    </Switch>
                )}
            </For>

            <Send send={props.send} />

            <For each={props.components.bottom}>
                {(componentsBottom, _) => (
                    <Switch fallback={<div></div>}>
                        <Match when={componentsBottom.kind === "SELECT"}>
                            <Select
                                value={componentsBottom.value}
                                name={componentsBottom.name}
                                metadata={props.metadata}
                                setMetadata={props.setMetadata}
                            />
                        </Match>

                        <Match when={componentsBottom.kind === "INPUT"}>
                            <Input
                                name={componentsBottom.name}
                                metadata={props.metadata}
                                setMetadata={props.setMetadata}
                            />
                        </Match>
                    </Switch>
                )}
            </For>
        </div>
    );
};

export default Navbar;
