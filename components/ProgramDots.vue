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

    globalStore.minimizeProgram(globalStore.focusedProgram);
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
