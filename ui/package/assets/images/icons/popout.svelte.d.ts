/** @typedef {typeof __propDef.props}  PopoutProps */
/** @typedef {typeof __propDef.events}  PopoutEvents */
/** @typedef {typeof __propDef.slots}  PopoutSlots */
export default class Popout extends SvelteComponentTyped<{
    width?: string | undefined;
    color?: string | undefined;
    margin?: string | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type PopoutProps = typeof __propDef.props;
export type PopoutEvents = typeof __propDef.events;
export type PopoutSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        width?: string | undefined;
        color?: string | undefined;
        margin?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
