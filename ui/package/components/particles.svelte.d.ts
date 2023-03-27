import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        bg_color: string;
        particles_color: string;
        triangles?: boolean | undefined;
        screen_width: number;
        speed?: number | undefined;
        distance?: number | undefined;
        particles_number?: [number, number] | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type ParticlesProps = typeof __propDef.props;
export type ParticlesEvents = typeof __propDef.events;
export type ParticlesSlots = typeof __propDef.slots;
export default class Particles extends SvelteComponentTyped<ParticlesProps, ParticlesEvents, ParticlesSlots> {
}
export {};
