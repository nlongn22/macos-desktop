<template>
    <div class="focus control-centre-module">
        <div class="colored-icon__background">
            <Icon
                name="moon-fill"
                class="colored-icon"
            />
        </div>
        <div class="focus__title control-centre-module__title control-centre-module__title--has-icon">
            Focus
            <Icon
                name="chevron-right"
                class="control-centre-module__icon"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.focus {
    display: flex;
    align-items: center;
    column-gap: $space-2;
}

.focus__title {
    flex-grow: 1;
}
</style>
