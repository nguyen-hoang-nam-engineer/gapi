import { Component } from "solid-js";

const Response: Component<{ body: string; headers: Object }> = (props) => {
    return (
        <div>
            <div class="bg-white p-3 box-border" style="height: 100%">
                {props.body}
            </div>
        </div>
    );
};

export default Response;
