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
            class="wallpaper__list"
            :class="{ 'wallpaper__list--expanded': isExpanded }"
        >
            <NuxtPicture
                v-for="(wallpaper, index) in wallpapers"
                :key="index"
                preload
                :src="`/images/wallpapers/${wallpaper}-light.png`"
                :img-attrs="{ class: 'wallpaper__image' }"
                class="wallpaper__picture"
                :class="{ 'wallpaper__picture--active': globalStore.wallpaper === wallpaper }"
                @click="updateWallpaper(wallpaper)"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from '~~/store/global';

const globalStore = useGlobalStore();

const wallpapers = ['sonoma', 'ventura', 'monterey', 'big-sur', 'catalina', 'mojave'];

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

.wallpaper__list {
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

.wallpaper__picture {
    block-size: $space-18;
    flex-shrink: 0;

    &--active {
        &:deep(.wallpaper__image) {
            border: $border-width-thin solid $color-border;
        }
    }
}

:deep(.wallpaper__image) {
    @include size(r(109.2), 100%);
    padding: $space-0;
    border-radius: $border-radius-md;
    object-fit: cover;
}
</style>
