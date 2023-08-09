<template>
    <div class="dots">
        <div
            v-for="(dot, index) in dots"
            :key="index"
            class="dot__background"
            @click="[
                closeProgram(index),
                minimizeProgram(index)
            ]"
        >
            <span
                class="dot"
                v-html="dot"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from '~/store/global';
const { $gsap } = useNuxtApp();

const globalStore = useGlobalStore();

interface DotsProps {
    programName: string;
}

const props = defineProps<DotsProps>();

const dots = ['&times;', '&minus;', '&plus;'];

function closeProgram(dotIndex: number): void {
    if (dotIndex !== 0) {
        return;
    }

    globalStore.closeProgram(props.programName);
    globalStore.focusProgram('finder');
}

function minimizeProgram(dotIndex: number): void {
    if (dotIndex !== 1) {
        return;
    }

    const target = `#desktop-${props.programName}`;
    const targetElement = document.getElementById(target.slice(1));

    const width = targetElement?.offsetWidth ?? 1;
    const height = targetElement?.offsetHeight ?? 1;
    const widthRatio = 60 / width;
    const heightRatio = 60 / height;

    const tl = $gsap.timeline();

    tl.to(target, { scale: 0 });
    tl.add(() => {
        globalStore.minimizeProgram(globalStore.focusedProgram);
    });
    tl.set(target, {
        x: 0,
        y: 0,
        z: 0,
        force3D: true,
    });
    tl.to(target, { scale: Math.min(widthRatio, heightRatio) });
}
</script>

<style lang="scss" scoped>
.dots,
.dot__background {
    display: flex;
    align-items: center;
}

.dots {
    column-gap: $space-2;

    @include has-hover {
        .dot {
            visibility: visible;
        }
    }
}

.dot {
    visibility: hidden;
    transform: translateY(r(-1.5));
    font-size: r(13);
    font-weight: $font-weight-medium;
    color: rgba($color-foreground, $opacity-high);
}

.dot__background {
    @include size($space-3);
    justify-content: center;
    border-radius: $border-radius-full;

    &:first-child {
        background-color: $color-red;
    }

    &:nth-child(2) {
        background-color: $color-orange;
    }

    &:last-child {
        background-color: $color-green;
    }
}
</style>
