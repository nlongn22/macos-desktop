<template>
    <main>
        <section class="desktop">
            <NuxtImg
                :src="`/wallpapers/${wallpapers[0]}.jpg`"
                class="desktop__wallpaper"
            />
        </section>
    </main>
</template>

<script lang="ts" setup>
const wallpapers = ['ventura-light'];
</script>

<style lang="scss" scoped>
.desktop {
    block-size: 100vh;
}

.desktop__wallpaper {
    @include size(100%);
    object-fit: cover;
}
</style>
