import { toast_store } from '../ts/store';
export class ToastService {
    static _instance;
    static getInstance(interval = 5000) {
        if (!ToastService._instance) {
            ToastService._instance = new ToastService(interval);
        }
        return ToastService._instance;
    }
    toasts = [];
    remove_interval;
    timeouts = {};
    toast_store = toast_store;
    constructor(interval) {
        this.remove_interval = interval;
        toast_store.subscribe((toasts) => (this.toasts = toasts));
    }
    addToast(toast) {
        toast = toast;
        toast.time_added = Date.now();
        toast.id = Math.random();
        this.toasts.unshift(toast);
        toast_store.set(this.toasts);
        const timeout = setTimeout(() => {
            this.removeToast(toast.id);
        }, toast.duration || this.remove_interval);
        this.timeouts[toast.id] = timeout;
    }
    dismiss(id) {
        const index = this.toasts.findIndex((t) => t.id === id);
        this.toasts.splice(index, 1);
        clearTimeout(this.timeouts[id]);
        delete this.timeouts[id];
        toast_store.set(this.toasts);
    }
    removeToast(id) {
        const index = this.toasts.findIndex((t) => t.id === id);
        this.toasts.splice(index, 1);
        delete this.timeouts[id];
        toast_store.set(this.toasts);
    }
}
