import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'light' | 'dark';

export const theme = createThemeStore();

theme.subscribe((value) => {
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
  const { subscribe, update } = writable<Theme>(stored ?? 'light');

  return {
    subscribe,
    toggle: () => {
      update((value: Theme) => (value === 'dark' ? 'light' : 'dark'));
    },
  };
}

function getStoredTheme(): Theme | null {
  return browser ? localStorage.theme : null;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function prefersDarkMode() {
  if (browser) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return null;
}
