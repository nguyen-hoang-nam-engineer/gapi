import { Component, createComputed, createSignal } from "solid-js";
import { invoke } from "@tauri-apps/api";

import Navbar from "./main/Navbar";
import Request from "./main/Request";
import Response from "./main/Response";

import IPlugins from "../interface/PluginsInterface";
import INavbarComponent from "../interface/NavbarComponentsInterface";

const Main: Component<{ choosePlugin: number; plugins: IPlugins }> = (props: {
    choosePlugin: number;
    plugins: { name: string; value: string }[];
}) => {
    const [response, setResponse] = createSignal({ headers: {}, body: "" });
    const [request, setRequest] = createSignal({ headers: {}, body: "" });
    const [metadata, setMetadata] = createSignal({});
    const [params, _] = createSignal({
        metadata: metadata(),
        request: request(),
    });
    const [choosePlugin, setChoosePlugin] = createSignal(props.choosePlugin);

    const [navbarComponents, setNavbarComponents] =
        createSignal<INavbarComponent>({ top: [], bottom: [] });

    createComputed(() => {
        setChoosePlugin(props.choosePlugin);

        invoke(
            `plugin:${props.plugins[choosePlugin()].value}|navbar_component`,
            {}
        )
            .then((v: INavbarComponent) => {
                setNavbarComponents(v);
            })
            .catch((_) => {
                setNavbarComponents({ top: [], bottom: [] });
            });
    });

    const send = () => {
        console.log(params());
        invoke(
            `plugin:${props.plugins[choosePlugin()].value}|send`,
            params()
        ).then((resp: string) => {
            setResponse((v) => ({ ...v, body: resp }));
        });
    };

    return (
        <div
            class="flex-grow-1 grid gap-6 p-6"
            style="grid-template-rows: 2rem 1fr 1fr;"
        >
            <Navbar
                metadata={metadata()}
                setMetadata={setMetadata}
                components={navbarComponents()}
                send={send}
            />
            <Request {...request()} setRequest={setRequest} />
            <Response {...response()} />
        </div>
    );
};

export default Main;
