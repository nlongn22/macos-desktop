<template>
    <div class="desktop">
        <NuxtImg
            :src="`/images/wallpapers/${wallpaper()}.png`"
            class="desktop__wallpaper"
        />

        <Transition name="fade">
            <Launchpad v-if="globalStore.isProgramActive('launchpad')" />
        </Transition>
        <ProgramSafari v-if="globalStore.isProgramActive('safari')" />
        <ProgramSettings v-if="globalStore.isProgramActive('settings')" />
        <ProgramCalculator v-if="globalStore.isProgramActive('calculator')" />
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
