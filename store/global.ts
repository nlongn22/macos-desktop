import { useStorage } from '@vueuse/core';

export const useGlobalStore = defineStore('dock', () => {
    const wallpaper = useStorage('wallpaper', 'ventura');

    const brightness = useStorage('brightness', 1);

    const dock = useStorage('dock', [
        'finder',
        'launchpad',
        'settings',
        'safari',
        'calculator',
        'messages',
        'notes',
    ]);

    const activePrograms: Ref<string[]> = ref([]);

    const focusedProgram = ref('finder');

    const minimizedPrograms: Ref<string[]>  = ref([]);

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

    function closeProgram(programName: string): void {
        activePrograms.value = activePrograms.value.filter((program: string) => program !== programName);
    }

    function isProgramActive(programName: string): boolean {
        return activePrograms.value.includes(programName);
    }

    function focusProgram(programName: string): void {
        focusedProgram.value = programName;
    }

    function isProgramFocused(programName: string): boolean {
        return focusedProgram.value === programName;
    }

    function minimizeProgram(programName: string): void {
        minimizedPrograms.value.push(programName);
    }

    function revealProgram(programName: string): void {
        minimizedPrograms.value = minimizedPrograms.value.filter((program: string) => program !== programName);
    }

    function isProgramMinimized(programName: string): boolean {
        return minimizedPrograms.value.includes(programName);
    }

    return {
        wallpaper,
        brightness,
        dock,
        activePrograms,
        focusedProgram,
        minimizedPrograms,
        saveWallpaper,
        saveBrightness,
        saveDockOrder,
        openProgram,
        closeProgram,
        isProgramActive,
        focusProgram,
        isProgramFocused,
        minimizeProgram,
        revealProgram,
        isProgramMinimized,
    };
});
