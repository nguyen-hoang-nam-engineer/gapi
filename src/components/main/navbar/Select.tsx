import { Component, createSignal, onMount, Setter } from "solid-js";
import { For } from "solid-js";
import type { JSX } from "solid-js";

const Select: Component<{
    name: string;
    value: Object;
    metadata: Object;
    setMetadata: Setter<Object>;
}> = (props) => {
    const [value, setValue] = createSignal(props.value[0]);

    onMount(() => {
        props.setMetadata((metadata: object) => {
            metadata[props.name] = value().value;
            return metadata;
        });
    });

    const onChange: JSX.EventHandler<HTMLSelectElement, Event> = (event) => {
        props.setMetadata((metadata: object) => {
            metadata[props.name] = event.currentTarget.value;
            return metadata;
        });

        setValue(event.currentTarget.value);
    };

    return (
        <select name="method" value={value()} onChange={onChange}>
            <For each={props.value}>
                {(mergedValue, _) => (
                    <option value={mergedValue.value}>
                        {mergedValue.name}
                    </option>
                )}
            </For>
        </select>
    );
};

export default Select;
