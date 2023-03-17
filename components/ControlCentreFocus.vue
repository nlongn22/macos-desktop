<template>
    <div class="focus control-centre-module">
        <div class="colored-icon__background">
            <Icon
                name="moon"
                class="focus__icon colored-icon"
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
.focus {
    inline-size: 100%;
    block-size: r(62.5);
    display: flex;
    align-items: center;
    column-gap: $space-2;
}

.focus__icon {
    transform: rotate(-30deg);
}
</style>
