import type { ToastMetaType } from '../types/toast.types';
export declare class ToastService {
    private static _instance;
    static getInstance(interval?: number): ToastService;
    private toasts;
    private remove_interval;
    private timeouts;
    toast_store: import("svelte/store").Writable<ToastMetaType[]>;
    constructor(interval: number);
    addToast(toast: any): void;
    dismiss(id: number): void;
    private removeToast;
}
