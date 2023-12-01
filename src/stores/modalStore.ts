import { writable } from 'svelte/store';

export const isModalOpen = writable(false);

let modalResolve: () => void | null;

export const openModalPromise = () => {
    return new Promise<void>((resolve) => {
        modalResolve = resolve;
        isModalOpen.set(true);
    });
};

export const closeModalPromise = () => {
    isModalOpen.set(false);
    modalResolve && modalResolve();
};