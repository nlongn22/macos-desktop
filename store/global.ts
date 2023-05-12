import { useStorage } from '@vueuse/core';

export const useGlobalStore = defineStore('dock', () => {
    const brightness = useStorage('brightness', 1);

    const dock = useStorage('dock', [
        'finder', 'launchpad', 'system-settings', 'safari', 'calculator', 'messages', 'notes', 'trash',
    ]);

    const activePrograms: Ref<string[]> = ref([]);

    function saveBrightness(value: number): void {
        brightness.value = value;
    }

    function saveDockOrder(programs: string[]): void {
        dock.value = programs;
    }

    function openProgram(programName: string): void {
        activePrograms.value.push(programName);
    }

    function isProgramActive(programName: string): boolean {
        return activePrograms.value.includes(programName);
    }

    return { brightness, dock, activePrograms, saveBrightness, saveDockOrder, openProgram, isProgramActive };
});
