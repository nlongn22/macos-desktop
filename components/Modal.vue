<template>
    <div class="modal">
        <slot />
    </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.modal {
    padding-inline: $space-4;
    padding-block-start: $space-3;
    padding-block-end: $space-2;
    border-radius: $border-radius-s;
    border: $border-width-ultra-thin solid rgba($color-border-darker, $opacity-very-high);
    backdrop-filter: $blur-very-high;
    box-shadow: rgba($color-foreground, 0.25) 0 r(3) $space-2;
    background-color: rgba($color-background, $opacity-very-high);
}
</style>
