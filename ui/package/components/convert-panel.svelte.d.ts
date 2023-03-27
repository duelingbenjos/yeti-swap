import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: Record<string, never>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type ConvertPanelProps = typeof __propDef.props;
export type ConvertPanelEvents = typeof __propDef.events;
export type ConvertPanelSlots = typeof __propDef.slots;
export default class ConvertPanel extends SvelteComponentTyped<ConvertPanelProps, ConvertPanelEvents, ConvertPanelSlots> {
}
export {};
