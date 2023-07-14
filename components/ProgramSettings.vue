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
                    v-for="(page, index) in settingsPages"
                    :key="index"
                    class="settings__item"
                    :class="{ 'settings__item--active': activeSettingsPage === page.name }"
                    @click="switchPage(page.name)"
                >
                    <div class="item__icon-background">
                        <Icon
                            :name="page.icon"
                            class="item__icon"
                        />
                    </div>

                    {{ page.name }}
                </div>
            </div>
        </div>

        <div class="settings__main">
            <div class="settings__main-title">
                {{ activeSettingsPage }}
            </div>
            <SettingsAppearance v-if="activeSettingsPage === 'appearance'" />
            <SettingsWallpaper v-if="activeSettingsPage === 'wallpaper'" />
        </div>
    </Program>
</template>

<script setup lang="ts">
interface SettingsPage {
    name: string,
    icon: string,
}

const settingsNavbarRef: Ref<HTMLElement | undefined> = ref();

const settingsPages: SettingsPage[] = [
    {
        name: 'appearance',
        icon: 'rectangle-left-white-right-black',
    },
    {
        name: 'wallpaper',
        icon: 'circle-hexagongrid',
    },
];

const activeSettingsPage = ref('appearance');

function switchPage(name: string): void {
    activeSettingsPage.value = name;
}
</script>

<style lang="scss" scoped>
.settings {
    @include size(r(720), r(360));
    min-inline-size: initial;
    max-block-size: r(500);
    display: flex;
    backdrop-filter: $blur-xl;
    background-color: rgba($color-white-100, $opacity-very-high);
}

.settings__sidebar {
    inline-size: r(315);
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
    padding-inline: $space-2;
    padding-block: $space-1;
    text-transform: capitalize;

    &--active {
        border-radius: $border-radius;
        color: $color-background;
        background-color: $color-blue;
    }

    &:first-child {
        .item__icon {
            transform: rotate(180deg);
        }

        .item__icon-background {
            background-color: $color-foreground;
        }
    }

    &:nth-child(2) {
        .item__icon-background {
            background-color: $color-cyan;
        }
    }
}

.item__icon-background {
    display: flex;
    margin-inline-end: $space-2;
    padding: $space-0;
    border-radius: $border-radius-md;
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
    margin-inline-start: $space-2;
    margin-block: $space-4;
    text-transform: capitalize;
    font-size: r(15);
    font-weight: $font-weight-semibold;
    color: rgba($color-gray-100, $opacity-very-high);
}
</style>
