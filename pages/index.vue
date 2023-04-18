<template>
    <div class="desktop">
        <NuxtImg
            :src="`/wallpapers/${wallpapers[0]}.jpg`"
            class="desktop__wallpaper"
        />
        <ProgramSafari />
    </div>
</template>

<script lang="ts" setup>
import { useGlobalStore } from '~/store/global';

const globalStore = useGlobalStore();

const wallpapers = ['ventura-light'];

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
