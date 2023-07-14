<template>
    <div class="control-centre-module">
        <div class="control-centre-module__header">
            <slot
                v-if="props.hasAdditionalIcon"
                name="icon"
            />
            <slot name="title" />
            <Icon
                v-if="props.hasChevron"
                name="chevron-right"
                class="control-centre-module__icon-chevron"
            />
        </div>

        <slot name="content" />
    </div>
</template>

<script setup lang="ts">
interface ControlCentreModuleProps {
    hasAdditionalIcon?: boolean,
    hasChevron?: boolean,
}

const props = defineProps<ControlCentreModuleProps>();
</script>

<style lang="scss" scoped>
.control-centre-module {
    padding: r(10);
    border-radius: $border-radius-xl;
    backdrop-filter: $blur-3xl;
    box-shadow: rgba($color-foreground, $opacity-low) 0 r(3) $space-2;
    background-color: rgba($color-background, $opacity-low);

    @include has-hover {
        .control-centre-module__icon-chevron {
            opacity: 1;
        }
    }
}

.control-centre-module__header {
    display: flex;
    align-items: center;
    column-gap: $space-2;
    inline-size: 100%;
    font-size: $space-3;
    font-weight: $font-weight-medium;
    color: $color-foreground;
}

.control-centre-module__icon-chevron {
    display: flex;
    margin-inline-start: auto;
    opacity: 0;
    font-size: r(10);
    color: rgba($color-foreground, $opacity-medium);
}
</style>
