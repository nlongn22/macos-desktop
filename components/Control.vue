<template>
    <Modal class="control">
        <div class="control__header text-default">
            <span class="control__title">
                <slot name="title" />
            </span>
            <span class="control__additional-info">
                <slot name="additional-info" />
            </span>
        </div>

        <hr>

        <slot name="content" />

        <hr>

        <p class="text-default hover-effect">
            <slot name="settings-link" />
        </p>
    </Modal>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.control {
    position: absolute;
    inset-inline-start: 0;
    inset-block-end: 0;
    display: flex;
    flex-direction: column;
    row-gap: $space-1;
    font-size: r(12);
    color: $color-gray-100;
}

.control__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.control__title {
    font-weight: $font-weight-bold;
}

.control__additional-info {
    color: $color-gray-100;
}
</style>
