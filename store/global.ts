import { useStorage } from '@vueuse/core';

export const useGlobalStore = defineStore('dock', () => {
    const brightness = useStorage('brightness', 1);

    const dock = useStorage('dock', [
        'finder', 'launchpad', 'calculator',
        'calendar', 'clock', 'contacts',
        'facetime', 'messages', 'notes',
        'photos', 'reminders', 'safari',
        'trash',
    ]);

    function saveBrightness(value: number): void {
        brightness.value = value;
    }

    function saveDockOrder(programs: string[]): void {
        dock.value = programs;
    }

    return { brightness, dock, saveBrightness, saveDockOrder };
});
