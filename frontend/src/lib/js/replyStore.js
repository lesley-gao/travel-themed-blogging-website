// this is used in comment section, to save the state
// which reply editor is opened currently in the recursive structure
import { writable } from 'svelte/store';

export const openEditor = writable(null);
