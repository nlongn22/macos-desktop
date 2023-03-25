<template>
    <ControlCentreModule
        has-chevron
        class="cc__slider"
    >
        <template #title>
            {{ props.title }}
        </template>

        <template #content>
            <div class="cc__slider-controls">
                <Slider
                    :icon-name="props.primaryIconName"
                    class="cc__slider-control"
                    :class="{ 'cc__slider-control--reduced' : props.secondaryIconName }"
                />
                <div
                    v-if="secondaryIconName"
                    class="colored-icon__background"
                >
                    <Icon
                        :name="secondaryIconName"
                        class="colored-icon"
                    />
                </div>
            </div>
        </template>
    </ControlCentreModule>
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
.cc__slider {
    display: flex;
    flex-direction: column;
    row-gap: $space-1;
}

.cc__slider-controls {
    display: flex;
    align-items: center;
    column-gap: $space-2;
}

.cc__slider-control {

    &--reduced {
        max-inline-size: r(224);
    }
}
</style>
