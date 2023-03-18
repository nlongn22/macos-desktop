<template>
    <div class="slider">
        <div
            ref="sliderContainer"
            class="slider__container"
            @mousedown="updateProgress"
        >
            <Icon
                :name="props.iconName"
                class="slider__icon"
            />
            <div
                ref="sliderProgress"
                class="slider__progress"
            >
                <div
                    class="slider__handle"
                    :class="{ 'slider__handle--borderless' : isHandleBorderVisible }"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface SliderProps {
    iconName: string,
}

const props = defineProps<SliderProps>();

const sliderContainer = ref();
const sliderProgress = ref();
const isHandleBorderVisible = ref();

function updateSliderProgress(event: MouseEvent): any {
    const sliderContainerPosition = sliderContainer.value.getBoundingClientRect();
    const progressWidth = Math.ceil(event.clientX - sliderContainerPosition.left + 10); // + 10 so pointer is middle of handle

    isHandleBorderVisible.value = progressWidth <= 40;

    sliderProgress.value.style.width = `calc(${progressWidth}px`;
}

function removeMouseMovementListener(): any {
    document.removeEventListener('mousemove', updateSliderProgress);
}

function updateProgress(): void {
    document.addEventListener('mousemove', updateSliderProgress);
    document.addEventListener('mouseup', removeMouseMovementListener);
}

onMounted(() => {
    sliderProgress.value.style.width = '50%';
});

onBeforeUnmount(() => {
    document.removeEventListener('mouseup', removeMouseMovementListener);
});
</script>

<style lang="scss" scoped>
.slider {
    inline-size: 100%;
    display: flex;
    flex-direction: column;
    row-gap: $space-1;
}

.slider__container {
    position: relative;
    block-size: r(22);
    display: flex;
    border-radius: $border-radius-3xl;
    border: $border-width-thin solid rgba($color-border, $opacity-very-low);
    background-color: rgba($color-foreground, $opacity-very-low);
    overflow: hidden;
}

.slider__progress {
    min-inline-size: $space-5;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    border-radius: $border-radius-3xl;
    background-color: $color-background;
}

.slider__icon {
    position: absolute;
    inset-inline-start: $space-1;
    inset-block-start: 50%;
    transform: translateY(-50%);
    font-size: $space-3;
    color: rgba($color-foreground, $opacity-low);
}

.slider__handle {
    @include size($space-5);
    border-radius: $border-radius-full;
    border: $border-width-thin solid rgba($color-border, $opacity-very-low);
    box-shadow: rgba($color-foreground, $opacity-low) 0 $space-2 $space-6;
    background-color: $color-background;
    transition: all $transition-duration-slow;

    &--borderless {
        border-width: 0;
        box-shadow: none;
    }
}
</style>
