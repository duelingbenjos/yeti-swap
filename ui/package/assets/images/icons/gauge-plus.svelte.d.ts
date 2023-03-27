/** @typedef {typeof __propDef.props}  GaugePlusProps */
/** @typedef {typeof __propDef.events}  GaugePlusEvents */
/** @typedef {typeof __propDef.slots}  GaugePlusSlots */
export default class GaugePlus extends SvelteComponentTyped<{
    width?: string | undefined;
    color?: string | undefined;
    margin?: string | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type GaugePlusProps = typeof __propDef.props;
export type GaugePlusEvents = typeof __propDef.events;
export type GaugePlusSlots = typeof __propDef.slots;
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
