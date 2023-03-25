<template>
    <Dialog class="menu-bar-module">
        <div class="menu-bar-module__header text-default">
            <span class="menu-bar-module__title">
                <slot name="title" />
            </span>
            <span class="menu-bar-module__additional-info">
                <slot name="additional-info" />
            </span>
        </div>

        <hr>

        <slot name="content" />

        <hr>

        <p class="text-default hover-effect">
            <slot name="settings-link" />
        </p>
    </Dialog>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.menu-bar-module {
    inset-block-end: 0;
    inline-size: r(300);
    display: flex;
    flex-direction: column;
    row-gap: $space-1;
    padding-inline: $space-4;
    padding-block-start: $space-3;
    padding-block-end: $space-2;
    font-size: $space-3;
    color: rgba($color-foreground, $opacity-high);
}

.menu-bar-module__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.menu-bar-module__title {
    font-weight: $font-weight-semibold;
}

.menu-bar-module__additional-info {
    color: rgba($color-foreground, $opacity-high);
}
</style>
