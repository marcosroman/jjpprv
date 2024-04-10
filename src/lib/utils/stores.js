import { writable } from 'svelte/store';

export const selectedDate = writable((new Date()).toISOString().split('Z')[0]);

export const isTableViewSelected = writable(false);
