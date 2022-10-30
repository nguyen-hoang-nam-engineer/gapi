interface IPlugin {
    name: string;
    value: string;
}

export default interface IPlugins extends Array<IPlugin> {}
