<template>
    <div class="modal">
        <slot />
    </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.modal {
    padding-inline: r(14);
    padding-block: $space-1;
    border-radius: $border-radius-s;
    border: $border-width-ultra-thin solid rgba($color-border-darker, $opacity-very-high);
    backdrop-filter: $blur-very-high;
    background-color: rgba($color-background, $opacity-very-high);
}
</style>
