<template>
    <div class="focus-module control-centre-module">
        <div class="colored-icon__background">
            <Icon
                name="moon"
                class="focus-module__icon colored-icon"
            />
        </div>
        <span class="control-centre-module__title">
            Focus
        </span>
    </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.focus-module {
    inline-size: 100%;
    block-size: r(62.5);
    display: flex;
    align-items: center;
    column-gap: $space-2;
}

.focus-module__icon {
    transform: rotate(-30deg);
    color: rgba($color-foreground, $opacity-high);
}
</style>
