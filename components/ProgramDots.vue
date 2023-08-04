<template>
    <div class="dots">
        <div
            class="dot__background"
            @click="closeProgram"
        >
            <span class="dot">
                &times;
            </span>
        </div>
        <div class="dot__background">
            <span class="dot">
                &minus;
            </span>
        </div>
        <div class="dot__background">
            <span class="dot">
                &plus;
            </span>
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

function closeProgram(): void {
    globalStore.activePrograms = globalStore.activePrograms.filter((programName: string) => programName !== props.programName);
    globalStore.focusProgram('finder');
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
