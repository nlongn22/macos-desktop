<template>
    <main class="menu-bar">
        <section class="menu-bar__left">
            <Icon
                name="apple"
                class="menu-bar__icon-apple"
            />
            <div class="menu-bar__program-options">
                <span
                    v-for="(option, index) in programOptions"
                    :key="index"
                    class="menu-bar__program-option"
                >
                    {{ option }}
                </span>
            </div>
        </section>

        <section class="menu-bar__right">
            <div
                v-click-outside="closeControl"
                class="menu-bar__icon-controls"
            >
                <div
                    v-for="(iconName, index) in controlCenterIcons"
                    :key="index"
                    class="menu-bar__icon-background"
                    :class="{'menu-bar__icon-background--active' : activeIcon === iconName }"
                    @click="openControl(iconName)"
                >
                    <Icon
                        :name="iconName"
                        class="menu-bar__icon-control"
                    />
                </div>
                <BatteryControl v-if="activeIcon === 'battery'" />
            </div>
            <NuxtImg
                src="programs/siri.png"
                class="menu-bar__image-siri"
            />
            <span class="menu-bar__date">
                Tue 7. 3.
            </span>
            <span class="menu-bar__time">
                13:52
            </span>
        </section>
    </main>
</template>

<script setup lang="ts">
const programOptions = ['Finder', 'File', 'Edit', 'View', 'Go', 'Window', 'Help'];
const controlCenterIcons = ['battery', 'wifi', 'finder', 'control-center'];
const activeIcon = ref('');

function openControl(iconName: string): void {
    if (iconName === activeIcon.value) {
        activeIcon.value = '';
        return;
    }

    setTimeout(() => {
        activeIcon.value = iconName;
    }, 1);
}

function closeControl(): void {
    activeIcon.value = '';
}
</script>

<style lang="scss" scoped>
.menu-bar {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: space-between;
    inline-size: 100%;
    padding-inline: r(18);
    backdrop-filter: $blur-high;
    background: rgba($color-background, $opacity-high);
}

.menu-bar__left,
.menu-bar__program-options,
.menu-bar__right,
.menu-bar__icon-background,
.menu-bar__icon-controls {
    display: flex;
    align-items: center;
}

.menu-bar__icon-apple {
    @include size($space-2);
    margin-inline-end: r(18);
    margin-block-end: r(1);
}

.menu-bar__program-options {
    column-gap: r(18);
    color: $color-black;
}

.menu-bar__program-option:first-child {
    font-weight: $font-weight-bold;
}

.menu-bar__icon-controls {
    position: relative;
}

.menu-bar__icon-background {
    block-size: $space-3;
    padding-inline: r(9);

    &--active {
        border-radius: $border-radius-xs;
        backdrop-filter: $contrast-medium;
    }

    &:first-child {
        .menu-bar__icon-control {
            @include size($space-3);
        }
    }

    &:nth-child(2) {
        .menu-bar__icon-control {
            @include size(r(18));
        }
    }
}

.menu-bar__image-siri {
    @include size(r(14));
    margin-inline: r(9);
}

.menu-bar__date {
    margin-inline: r(9);
}
</style>
