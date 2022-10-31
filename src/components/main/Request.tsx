import { Component, createSignal, Match, Setter, Switch } from "solid-js";

import type { JSX } from "solid-js";

const Request: Component<{
    body: string;
    headers: Object;
    setRequest: Setter<Object>;
}> = (props) => {
    const [bodyValue, setBodyValue] = createSignal(props.body);
    const [headersValue, setHeadersValue] = createSignal(props.headers);
    const [tab, setTab] = createSignal("body");

    const onChangeBody: JSX.EventHandler<HTMLTextAreaElement, Event> = (
        event
    ) => {
        props.setRequest((request: object) => {
            request["body"] = event.currentTarget.value;
            return request;
        });

        setBodyValue(event.currentTarget.value);
    };

    const onChangeHeaders: JSX.EventHandler<HTMLTextAreaElement, Event> = (
        event
    ) => {
        props.setRequest((request: object) => {
            try {
                request["headers"] = JSON.parse(event.currentTarget.value);
            } catch (e) {
                request["headers"] = {};
            }

            return request;
        });

        try {
            setHeadersValue(JSON.parse(event.currentTarget.value));
        } catch (e) {
            setHeadersValue("");
        }
    };

    const updateTab = (value: string) => {
        setTab(value);
    };

    return (
        <div class="flex flex-col" style="height: 100%; ">
            <ul
                class="flex gap-4"
                style="list-style-type: none; padding: 0; flex-shrink: 0;"
            >
                <li
                    class="cursor-pointer"
                    onClick={() => {
                        updateTab("headers");
                    }}
                >
                    Headers
                </li>

                <li
                    class="cursor-pointer"
                    onClick={() => {
                        updateTab("body");
                    }}
                >
                    Body
                </li>
            </ul>

            <Switch>
                <Match when={tab() === "body"}>
                    <textarea
                        class="bg-white p-3 box-border resize-none"
                        style="width: 100%; outline: none; flex-grow: 1;"
                        value={bodyValue()}
                        onChange={onChangeBody}
                    >
                        {bodyValue()}
                    </textarea>
                </Match>

                <Match when={tab() === "headers"}>
                    <textarea
                        class="bg-white p-3 box-border resize-none"
                        style="width: 100%; outline: none; flex-grow: 1;"
                        value={JSON.stringify(headersValue())}
                        onChange={onChangeHeaders}
                    >
                        {JSON.stringify(headersValue())}
                    </textarea>
                </Match>
            </Switch>
        </div>
    );
};

export default Request;
