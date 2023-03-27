/** @typedef {typeof __propDef.props}  GaugeMinusProps */
/** @typedef {typeof __propDef.events}  GaugeMinusEvents */
/** @typedef {typeof __propDef.slots}  GaugeMinusSlots */
export default class GaugeMinus extends SvelteComponentTyped<{
    width?: string | undefined;
    color?: string | undefined;
    margin?: string | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type GaugeMinusProps = typeof __propDef.props;
export type GaugeMinusEvents = typeof __propDef.events;
export type GaugeMinusSlots = typeof __propDef.slots;
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
