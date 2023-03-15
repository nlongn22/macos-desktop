<template>
    <Dialog class="module">
        <div class="module__header text-default">
            <span class="module__title">
                <slot name="title" />
            </span>
            <span class="module__additional-info">
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
.module {
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

.module__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.module__title {
    font-weight: $font-weight-semibold;
}

.module__additional-info {
    color: rgba($color-foreground, $opacity-high);
}
</style>
