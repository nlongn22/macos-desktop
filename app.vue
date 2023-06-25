<template>
    <BootScreen
        v-if="isBootScreenVisible"
        @loading-has-finished="hideBootScreen"
    />
    <div
        v-else
        class="container"
    >
        <MenuBar />
        <NuxtPage />
        <Dock />
    </div>
</template>

<script setup lang="ts">
const isBootScreenVisible = ref(true);

function hideBootScreen() {
    isBootScreenVisible.value = false;
}
</script>

<style lang="scss" scoped>
.container {
    @include size(100vw, 100vh);
}
</style>
