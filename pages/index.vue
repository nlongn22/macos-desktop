<template>
    <div class="desktop">
        <NuxtImg
            :src="`/wallpapers/${wallpaper()}.png`"
            class="desktop__wallpaper"
        />

        <ProgramSafari v-if="isProgramActive('safari')" />
        <ProgramSettings v-if="isProgramActive('settings')" />
        <ProgramCalculator v-if="isProgramActive('calculator')" />
    </div>
</template>

<script lang="ts" setup>
import { useGlobalStore } from '~/store/global';

const globalStore = useGlobalStore();
const colorMode = useColorMode();

function wallpaper(): string {
    return colorMode.value === 'light' ?
        globalStore.wallpaper + '-light' :
        globalStore.wallpaper + '-dark';
}

function isProgramActive(programName: string): boolean {
    return globalStore.activePrograms.includes(programName);
}

onMounted(() => {
    document.body.style.filter = `brightness(${globalStore.brightness})`;
});
</script>

<style lang="scss" scoped>
.desktop {
    block-size: 100%;
}

.desktop__wallpaper {
    @include size(100%);
    object-fit: cover;
}
</style>
