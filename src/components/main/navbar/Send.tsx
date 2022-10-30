import { Component } from "solid-js";

const Send: Component<{ send: () => void }> = (props) => {
    return (
        <button
            onClick={props.send}
            class="text-xl flex-shrink-0"
            style="width: 5rem; height: 100%"
        >
            Send
        </button>
    );
};

export default Send;
