import { useStorage } from '@vueuse/core';

export const useGlobalStore = defineStore('dock', () => {
    const { $gsap } = useNuxtApp();

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

    function addProgramToDock(program: string): void {
        if (dock.value.includes(program)) {
            return;
        }

        dock.value.push(program);
    }

    function openProgram(programName: string): void {
        closeProgram('launchpad');

        activePrograms.value.push(programName);
    }

    function isProgramActive(programName: string): boolean {
        return activePrograms.value.includes(programName);
    }

    function closeProgram(programName: string): void {
        activePrograms.value = activePrograms.value.filter((program: string) => program !== programName);
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

    function isProgramMinimized(programName: string): boolean {
        return minimizedPrograms.value.includes(programName);
    }

    function revealProgram(programName: string): void {
        closeProgram('launchpad');

        const target = `#desktop-${programName}`;

        const tl = $gsap.timeline({
            defaults: {
                duration: 0.4,
            },
        });
    
        tl.to(target, {
            scale: 0,
            ease: 'power4.out',
        });
        tl.to(`#minimized-${programName} .dock__minimized-thumbnail`, {
            opacity: 0,
        }, '-=0.4');
        tl.to(`#minimized-${programName}`, {
            inlineSize: 0,
            blockSize: 0,
            marginInline: -8,
        });
        tl.add(() => {
            minimizedPrograms.value = minimizedPrograms.value.filter((program: string) => program !== programName);
            focusProgram(programName);
        });
        tl.to(target, {
            y: 6,
            scale: 1,
            ease: 'power4.out',
        });
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
        addProgramToDock,
        openProgram,
        isProgramActive,
        closeProgram,
        focusProgram,
        isProgramFocused,
        minimizeProgram,
        isProgramMinimized,
        revealProgram,
    };
});
