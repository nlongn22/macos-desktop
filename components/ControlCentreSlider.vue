<template>
    <div class="control-centre__slider control-centre-module">
        <span class="control-centre-module__title">
            {{ props.title }}
        </span>
        <div class="control-centre__slider-controls">
            <Slider
                :icon-name="props.primaryIconName"
                class="control-centre__slider-control"
                :class="{ 'control-centre__slider-control--reduced' : props.secondaryIconName }"
            />
            <div
                v-if="secondaryIconName"
                class="colored-icon__background"
            >
                <Icon
                    :name="secondaryIconName"
                    class="control-centre__icon-secondary colored-icon"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface ControlCentreSliderProps {
    title: string,
    primaryIconName: string,
    secondaryIconName?: string,
}

const props = defineProps<ControlCentreSliderProps>();
</script>

<style lang="scss" scoped>
.control-centre__slider {
    display: flex;
    flex-direction: column;
    row-gap: $space-1;
}

.control-centre__slider-controls {
    display: flex;
    align-items: center;
    column-gap: $space-2;
}

.control-centre__slider-control {
    &--reduced {
        max-inline-size: r(224);
    }
}

.control-centre__icon-secondary {
    // Override .colored-icon partial
    inline-size: 100% !important;
    block-size: 100% !important;
    min-inline-size: r(26);
    font-size: $space-14;
}
</style>
