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
const wallpapers = ['ventura-light'];
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
