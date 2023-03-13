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
    inset-inline-start: 0;
    inset-block-end: 0;
    display: flex;
    flex-direction: column;
    row-gap: $space-1;
    font-size: r(12);
    color: $color-gray-100;
}

.module__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.module__title {
    font-weight: $font-weight-bold;
}

.module__additional-info {
    color: $color-gray-100;
}
</style>
