import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        scrollHandler: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type LandingProps = typeof __propDef.props;
export type LandingEvents = typeof __propDef.events;
export type LandingSlots = typeof __propDef.slots;
export default class Landing extends SvelteComponentTyped<LandingProps, LandingEvents, LandingSlots> {
}
export {};
