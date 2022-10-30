import { Component, createSignal, Setter } from "solid-js";

import type { JSX } from "solid-js";

const Input: Component<{
    name: string;
    metadata: Object;
    setMetadata: Setter<Object>;
}> = (props) => {
    const [value, setValue] = createSignal("");

    const onChange: JSX.EventHandler<HTMLInputElement, Event> = (event) => {
        props.setMetadata((metadata: object) => {
            metadata[props.name] = event.currentTarget.value;
            return metadata;
        });

        setValue(event.currentTarget.value);
    };

    return (
        <input
            class="flex-grow-1 m-0 b-0"
            style="height: 100%; padding: 0 .75rem 0 .75rem"
            type="text"
            value={value()}
            onChange={onChange}
        />
    );
};

export default Input;
