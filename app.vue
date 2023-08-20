<template>
    <BootScreen
        v-show="isBootScreenVisible"
        @loading-has-finished="hideBootScreen"
    />

    <div
        class="container"
        :class="{ 'container--visible': !isBootScreenVisible }"
    >
        <MenuBar />
        <NuxtPage />
        <Dock />
    </div>
</template>

<script setup lang="ts">
const isBootScreenVisible = ref(true);

function hideBootScreen(): void {
    isBootScreenVisible.value = false;
}
</script>

<style lang="scss" scoped>
.container {
    @include size(100vw, 100vh);
    display: none;

    &--visible {
        display: block;
    }
}
</style>
