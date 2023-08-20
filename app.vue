<template>
    <BootScreen
        v-show="isBootScreenVisible"
        @loading-has-finished="hideBootScreen"
    />

    <div class="container">
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
