<template>
    <div class="container">
        <MenuBar />
        <Transition name="page" mode="out-in">
            <div :key="$route.fullPath">
                <NuxtPage />
            </div>
        </Transition>
        <Dock />
    </div>
</template>

<style lang="scss" scoped>
.container {
    @include size(100vw, 100vh);
}
</style>
