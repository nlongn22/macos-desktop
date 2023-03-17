<template>
    <Dialog class="spotlight">
        <Icon
            name="magnifyingglass"
            class="spotlight__icon"
        />
        <input
            placeholder="Spotlight Search"
            class="spotlight__input"
        >
    </Dialog>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.spotlight {
    inset-inline-start: 50%;
    inset-block-start: 25vh;
    transform: translate(-50%, -50%);
    inline-size: r(675);
    display: flex;
    align-items: center;
    column-gap: $space-1;
    padding-inline: $space-4;
    padding-block: $space-3;
    border-radius: $border-radius-xl;
    border-color: rgba($color-border, $opacity-low);
    box-shadow: rgba($color-foreground, $opacity-low) 0 r(20) r(30);
}

.spotlight__icon {
    margin-inline-end: $space-0;
    opacity: $opacity-high;
    font-size: $space-5;
}

.spotlight__input {
    inline-size: 100%;
    font-size: $space-6;
    font-weight: $font-weight-medium;

    &::placeholder {
        color: rgba($color-foreground, 0.25);
    }

    @include has-hover {
        cursor: revert;
    }
}
</style>
