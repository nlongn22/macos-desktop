<template>
    <Program
        :draggable-elements="[settingsNavbarRef]"
        vertical-only
        class="settings"
    >
        <div class="settings__sidebar">
            <div
                ref="settingsNavbarRef"
                class="settings__navbar"
            >
                <ProgramDots program-name="settings" />
            </div>

            <div class="settings__items">
                <div
                    class="settings__item settings__item--active">
                    <div class="item__icon-background">
                        <Icon
                            name="circle-hexagongrid"
                            class="item__icon"
                        />
                    </div>
                    Wallpaper
                </div>
            </div>
        </div>

        <div class="settings__main">
            <div class="settings__main-title">
                Wallpaper
            </div>

            <SettingsWallpaper />
        </div>
    </Program>
</template>

<script setup lang="ts">
const settingsNavbarRef: Ref<HTMLElement | undefined> = ref();
</script>

<style lang="scss" scoped>
.settings {
    @include size(r(720), r(700));
    min-inline-size: initial;
    display: flex;
    backdrop-filter: $blur-xl;
    background-color: rgba($color-white-100, $opacity-very-high);
}

.settings__sidebar {
    inline-size: r(300);
    border-inline-end: $border-width-thin solid $color-border;
    background-color: rgba($color-gray, $opacity-very-low);
}

.settings__navbar {
    @include size(100%, $space-13);
    display: flex;
    padding-inline: $space-6;
    padding-block-start: $space-2;
    padding-block-end: $space-3;
}

.settings__items {
    padding: $space-3;
}

.settings__item {
    display: flex;
    align-items: center;

    &--active {
        padding-inline: $space-2;
        padding-block: $space-1;
        border-radius: $border-radius;
        color: $color-background;
        background-color: $color-blue;
    }
}

.item__icon-background {
    display: flex;
    margin-inline-end: $space-2;
    padding: $space-0;
    border-radius: $border-radius-md;
    background-color: $color-cyan;
}

.item__icon {
    color: $color-background;
    font-size: $space-4;
}

.settings__main {
    inline-size: 100%;
    padding-inline: $space-5;
    background-color: $color-white-100;
}

.settings__main-title {
    margin-inline-start: $space-3;
    margin-block: $space-4;
    font-size: r(15);
    font-weight: $font-weight-semibold;
    color: rgba($color-gray-100, $opacity-very-high);
}
</style>
