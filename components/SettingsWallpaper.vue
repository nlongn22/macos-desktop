<template>
    <div class="wallpaper">
        <div class="wallpaper__menu">
            <div class="wallpaper__title">
                All wallpapers
            </div>
            <div
                class="wallpaper__expand"
                @click="expandWallpapersList"
            >
                {{ expandText() }}
            </div>
        </div>

        <div
            class="wallpaper__images"
            :class="{ 'wallpaper__images--expanded': isExpanded }"
        >
            <NuxtImg
                v-for="(wallpaper, index) in wallpapers"
                :key="index"
                :src="`wallpapers/${wallpaper}-light.png`"
                class="wallpaper__image"
                :class="{ 'wallpaper__image--active': globalStore.wallpaper === wallpaper }"
                @click="updateWallpaper(wallpaper)"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from '~~/store/global';

const globalStore = useGlobalStore();

const wallpapers = ['sonoma', 'ventura', 'big-sur', 'monterey', 'catalina', 'mojave'];

const isExpanded = ref(false);

function expandText(): string {
    return isExpanded.value ? 'Show Less' : 'Show All ' + `(${wallpapers.length})`;
}

function expandWallpapersList(): void {
    isExpanded.value = !isExpanded.value;
}

function updateWallpaper(name: string): void {
    globalStore.saveWallpaper(name);
}
</script>

<style lang="scss" scoped>
.wallpaper {
    // Needed for a full width border.
    margin-inline: -$space-5;
    padding-inline: $space-5;
    border-block-start: $border-width-thin solid $color-border;
}

.wallpaper__menu {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-block-start: $space-6;
    margin-block-end: $space-3;
}

.wallpaper__title {
    font-weight: $font-weight-semibold;
    color: $color-gray-100;
}

.wallpaper__expand {
    font-size: r(11);
    font-weight: $font-weight-medium;
    color: $color-gray;

    @include has-hover {
        text-decoration: underline;
    }
}

.wallpaper__images {
    display: flex;
    gap: $space-2;
    overflow-x: scroll;

    &::-webkit-scrollbar {
        display: none;
    }

    &--expanded {
        flex-wrap: wrap;
    }
}

.wallpaper__image {
    @include size(r(109.2), r(72));
    flex-shrink: 0;
    block-size: $space-18;
    object-fit: cover;;
    padding: $space-0;
    border-radius: $border-radius-md;

    &--active {
        border: $border-width-thin solid $color-border;
    }
}
</style>
