<template>
    <div class="menu-bar">
        <div class="menu-bar__left">
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
        </div>

        <div class="menu-bar__right">
            <div
                v-click-outside="closeControl"
                class="menu-bar__icon-controls"
            >
                <Icon
                    v-for="(iconName, index) in controlCenterIcons"
                    :key="index"
                    :name="iconName"
                    class="menu-bar__icon-control"
                    :class="{'menu-bar__icon-control--active' : activeIcon === iconName }"
                    @click="openControl(iconName)"
                />
                <BatteryControl v-if="activeIcon === 'battery'" />
                <WifiControl v-if="activeIcon === 'wifi'" />
            </div>
            <NuxtImg
                src="programs/siri.png"
                class="menu-bar__image-siri"
            />
            <span class="menu-bar__date">
                Tue 7. 3.
            </span>
            <span class="menu-bar__time">
                {{ time }}
            </span>
        </div>

        <Spotlight v-if="activeIcon === 'spotlight'" />
    </div>
</template>

<script setup lang="ts">
const programOptions = ['Finder', 'File', 'Edit', 'View', 'Go', 'Window', 'Help'];
const controlCenterIcons = ['battery', 'wifi', 'spotlight', 'control-center'];
const activeIcon = ref('');
const time = ref('');

setInterval(() => {
    time.value = new Intl
        .DateTimeFormat('cs', { hour: 'numeric', minute: 'numeric' })
        .format(new Date());
}, 1000);

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
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    inline-size: 100%;
    block-size: $space-6;
    margin-block-end: -$space-6;
    padding-inline: $space-5;
    backdrop-filter: $blur-high;
    background: rgba($color-background, $opacity-high);
}

.menu-bar__left,
.menu-bar__program-options,
.menu-bar__right,
.menu-bar__icon-controls {
    display: flex;
    align-items: center;
    block-size: 100%;
}

.menu-bar__left {
    column-gap: $space-5;
}

.menu-bar__icon-apple {
    inline-size: $space-4;
    block-size: $space-4;
}

.menu-bar__program-options {
    column-gap: $space-5;
    color: $color-black;
}

.menu-bar__program-option:first-child {
    font-weight: $font-weight-bold;
}

.menu-bar__right {
    column-gap: $space-5;
}

.menu-bar__icon-controls {
    position: relative;
}

.menu-bar__icon-control {
    inline-size: $space-9;
    block-size: 100%;
    padding-inline: calc($space-5 / 2);

    &--active {
        border-radius: $border-radius-xs;
        background-color: rgba($color-gray-100, $opacity-low);
    }

    &:first-child {
        inline-size: $space-11;
    }

    &:nth-child(2) {
        inline-size: r(38);
    }
}

.menu-bar__image-siri {
    inline-size: r(14);
    block-size: r(14);
    margin-inline-start: calc($space-5 / -2);
}

.menu-bar__date {
    margin-inline-end: calc($space-5 / -2);
}
</style>
