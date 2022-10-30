interface IComponent {
    kind: string;
    name: string;
    value: Object;
}

interface IComponents extends Array<IComponent> {}

export default interface INavbarComponent {
    top: IComponents;
    bottom: IComponents;
}
