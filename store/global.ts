import { useStorage } from '@vueuse/core';

export const useGlobalStore = defineStore('dock', () => {
    const wallpaper = useStorage('wallpaper', 'ventura');

    const brightness = useStorage('brightness', 1);

    const dock = useStorage('dock', [
        'finder', 'launchpad', 'settings', 'safari', 'calculator', 'messages', 'notes', 'trash',
    ]);

    const activePrograms: Ref<string[]> = ref([]);

    const focusedProgram = ref('finder');

    function saveWallpaper(name: string): void {
        wallpaper.value = name;
    }

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

    function focusProgram(programName: string): void {
        focusedProgram.value = programName;
    }

    return {
        wallpaper,
        brightness,
        dock,
        activePrograms,
        focusedProgram,
        saveWallpaper,
        saveBrightness,
        saveDockOrder,
        openProgram,
        isProgramActive,
        focusProgram,
    };
});
