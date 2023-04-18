<template>
    <div class="slider">
        <div
            ref="backgroundRef"
            class="slider__background"
            @mousedown="updateProgress"
        >
            <Icon
                :name="props.iconName"
                class="slider__icon"
            />

            <div
                ref="progressRef"
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
import { useGlobalStore } from '~/store/global';

const globalStore = useGlobalStore();

interface SliderProps {
    iconName: string,
}

const props = defineProps<SliderProps>();

const backgroundRef: Ref<HTMLElement | undefined> = ref();
const progressRef: Ref<HTMLElement | undefined> = ref();

const isHandleBorderVisible = ref(false);

function updateProgress(): void {
    document.addEventListener('mousemove', updateSliderProgress);
    document.addEventListener('mouseup', removeMouseMovementListener);
}

function updateSliderProgress(event: MouseEvent): void {
    const backgroundRefPosition = backgroundRef.value?.getBoundingClientRect();
    const progressWidth = Math.ceil(event.clientX - (backgroundRefPosition?.left ?? 0) + 10); // + 10 so pointer is middle of handle

    isHandleBorderVisible.value = progressWidth <= 40;

    if (!progressRef.value) {
        return;
    }

    progressRef.value.style.width = `calc(${progressWidth}px`;

    if (props.iconName === 'sun-max-fill') {
        let normalizedValue = progressWidth / 256;

        if (normalizedValue < 0) {
            normalizedValue = 0.05;
        }

        if (normalizedValue > 1) {
            normalizedValue = 1;
        }

        document.body.style.filter = `brightness(${normalizedValue})`;
        globalStore.saveBrightness(normalizedValue);
    }
}

function removeMouseMovementListener(): any {
    document.removeEventListener('mousemove', updateSliderProgress);
}

onMounted(() => {
    if (!progressRef.value) {
        return;
    }

    progressRef.value.style.width = `calc(${globalStore.brightness * 256}px`;
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

.slider__background {
    position: relative;
    block-size: r(22);
    display: flex;
    border-radius: $border-radius-3xl;
    border: $border-width-thin solid rgba($color-border, $opacity-very-low);
    background-color: rgba($color-foreground, $opacity-very-low);
    overflow: hidden;
}

.slider__progress {
    inline-size: 100%;
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
