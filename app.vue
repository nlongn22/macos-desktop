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
    position: relative;
    inline-size: 100vw;
    block-size: 100vh;
}
</style>
