import type { Component } from "solid-js";

const Navbar: Component = () => {
    return (
        <div class="flex items-center" style="padding: 1rem">
            <input class="flex-grow-1" style="height: 30px" type="text" />
            <button
                class="text-xl flex-shrink-0"
                style="width: 5rem; height: 30px;"
            >
                Send
            </button>
        </div>
    );
};

export default Navbar;
