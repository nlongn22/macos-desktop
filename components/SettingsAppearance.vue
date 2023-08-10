<template>
    <div class="appearance">
        Appearance

        <div class="appearance__switcher">
            <div
                v-for="(mode, index) in modes"
                :key="index"
                class="appearance__mode"
                :class="{ 'appearance__mode--active': colorMode.preference === mode }"
                @click="changeMode(mode)"
            >
                <NuxtPicture
                    preload
                    :src="`/images/thumbnails/${mode}.png`"
                    :img-attrs="{ class: 'appearance__mode-image' }"
                    class="appearance__mode-picture"
                />
                <div class="appearance__mode-title">
                    {{ mode }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode();

const modes = ['light', 'dark', 'system'];

function changeMode(mode: string): void {
    colorMode.preference = mode;
}
</script>

<style lang="scss" scoped>
.appearance {
    display: flex;
    justify-content: space-between;
    margin-block-start: $space-6;
    margin-block-end: $space-3;
    padding: $space-2;
    border-radius: $border-radius;
    border: $border-width-thin solid $color-border;
}

.appearance__switcher {
    display: flex;
    align-items: baseline;
    column-gap: $space-2;
}

.appearance__mode {
    &--active {
        &:deep(.appearance__mode-image) {
            border-color: $color-blue;
        }

        .appearance__mode-title {
            margin-block-start: -$border-width-thin;
            font-weight: $font-weight-semibold;
        }
    }
}

:deep(.appearance__mode-image) {
    @include size($space-17, $space-11);
    box-sizing: unset;
    border-radius: $border-radius-lg;
    border: r(3) solid transparent;
    object-fit: cover;
}

.appearance__mode-title {
    text-align: center;
    text-transform: capitalize;
    font-size: r(11);
    color: $color-gray-100;
}
</style>
