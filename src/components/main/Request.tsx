import { Component, createSignal, Setter } from "solid-js";

import type { JSX } from "solid-js";

const Request: Component<{
    body: string;
    headers: Object;
    setRequest: Setter<Object>;
}> = (props) => {
    const [value, setValue] = createSignal(props.body);

    const onChange: JSX.EventHandler<HTMLTextAreaElement, Event> = (event) => {
        props.setRequest((request: object) => {
            request["body"] = event.currentTarget.value;
            return request;
        });

        setValue(event.currentTarget.value);
    };

    return (
        <div>
            <textarea
                class="bg-white p-3 box-border resize-none"
                style="height: 100%; width: 100%; outline: none;"
                value={value()}
                onChange={onChange}
            >
                {value()}
            </textarea>
        </div>
    );
};

export default Request;
