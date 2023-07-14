<template>
    <div class="desktop">
        <NuxtImg
            :src="`/wallpapers/${globalStore.wallpaper}.png`"
            class="desktop__wallpaper"
        />

        <ProgramSafari v-if="isProgramActive('safari')" />
        <ProgramSettings v-if="isProgramActive('settings')" />
    </div>
</template>

<script lang="ts" setup>
import { useGlobalStore } from '~/store/global';

const globalStore = useGlobalStore();

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
