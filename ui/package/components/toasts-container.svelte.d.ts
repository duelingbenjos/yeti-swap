import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: Record<string, never>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type ToastsContainerProps = typeof __propDef.props;
export type ToastsContainerEvents = typeof __propDef.events;
export type ToastsContainerSlots = typeof __propDef.slots;
export default class ToastsContainer extends SvelteComponentTyped<ToastsContainerProps, ToastsContainerEvents, ToastsContainerSlots> {
}
export {};
