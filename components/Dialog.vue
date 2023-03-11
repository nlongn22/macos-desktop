<template>
    <div class="dialog">
        <slot />
    </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.dialog {
    position: absolute;
    padding-inline: $space-4;
    padding-block-start: $space-3;
    padding-block-end: $space-2;
    border-radius: $border-radius-md;
    border: $border-width-thin solid rgba($color-border, $opacity-medium);
    backdrop-filter: $blur-2xl;
    box-shadow: rgba($color-foreground, $opacity-low) 0 r(3) $space-2;
    background-color: rgba($color-background, $opacity-medium);
}
</style>
