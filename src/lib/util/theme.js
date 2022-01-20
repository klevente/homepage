import { writable } from 'svelte/store';
import { browser } from '$app/env';

export const theme = createThemeStore();

theme.subscribe(value => {
    if (browser) {
        const rootClasses = document.documentElement.classList;
        if (value === 'dark') {
            rootClasses.add('dark');
        } else {
            rootClasses.remove('dark');
        }

        localStorage.theme = value;
    }
});

function createThemeStore() {
    const stored = getStoredTheme();
    const { subscribe, update } = writable(stored || 'light');

    return {
        subscribe,
        toggle: () => {
            update(value => value === 'dark' ? 'light' : 'dark');
        },
    };
}

function getStoredTheme() {
    return browser ? localStorage.theme : null;
}

function prefersDarkMode() {
    if (browser) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return undefined;
}
