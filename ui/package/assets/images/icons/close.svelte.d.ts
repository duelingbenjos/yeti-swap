/** @typedef {typeof __propDef.props}  CloseProps */
/** @typedef {typeof __propDef.events}  CloseEvents */
/** @typedef {typeof __propDef.slots}  CloseSlots */
export default class Close extends SvelteComponentTyped<{
    width?: string | undefined;
    opacity?: string | undefined;
    color?: string | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type CloseProps = typeof __propDef.props;
export type CloseEvents = typeof __propDef.events;
export type CloseSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        width?: string | undefined;
        opacity?: string | undefined;
        color?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
