<template>
    <div class="menu-bar">
        <div class="menu-bar__left">
            <Icon
                name="apple-logo"
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
                v-click-outside="closeModule"
                class="menu-bar__icons"
            >
                <Icon
                    v-for="(iconName, index) in menuBarIcons"
                    :key="index"
                    :name="iconName"
                    class="menu-bar__icon"
                    :class="{'menu-bar__icon--active' : activeIcon === iconName }"
                    @click="openModule(iconName)"
                />
                <MenuBarBattery v-if="activeIcon === 'battery-75'" />
                <MenuBarWifi v-if="activeIcon === 'wifi'" />
                <ControlCentre v-if="activeIcon === 'control-centre'" />
            </div>
            <NuxtImg
                src="programs/siri.png"
                class="menu-bar__image-siri"
            />
            <span class="menu-bar__date">
                Tue 17. 3.
            </span>
            <span class="menu-bar__time">
                {{ time }}
            </span>
        </div>

        <Spotlight v-if="activeIcon === 'magnifyingglass'" />
    </div>
</template>

<script setup lang="ts">
const programOptions = ['Finder', 'File', 'Edit', 'View', 'Go', 'Window', 'Help'];
const menuBarIcons = ['battery-75', 'wifi', 'magnifyingglass', 'control-centre'];
const activeIcon = ref('');
const time = ref('');

setInterval(() => {
    time.value = new Intl
        .DateTimeFormat('cs', { hour: 'numeric', minute: 'numeric' })
        .format(new Date());
}, 1000);

function openModule(iconName: string): void {
    if (iconName === activeIcon.value) {
        activeIcon.value = '';
        return;
    }

    setTimeout(() => {
        activeIcon.value = iconName;
    }, 1);
}

function closeModule(): void {
    activeIcon.value = '';
}
</script>

<style lang="scss" scoped>
.menu-bar {
    @include size(100%, $space-6);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-block-end: -$space-6;
    padding-inline: $space-5;
    backdrop-filter: $blur-3xl;
    background: rgba($color-background, $opacity-high);
}

.menu-bar__left,
.menu-bar__program-options,
.menu-bar__right,
.menu-bar__icons {
    block-size: 100%;
    display: flex;
    align-items: center;
}

.menu-bar__left {
    column-gap: $space-5;
}

.menu-bar__icon-apple {
    font-size: $space-4;
}

.menu-bar__program-options {
    column-gap: $space-5;
}

.menu-bar__program-option:first-child {
    font-weight: $font-weight-bold;
}

.menu-bar__right {
    column-gap: $space-4;
}

.menu-bar__icons {
    position: relative;
    display: flex;
}

.menu-bar__icon {
    // Uses regular sizes instead of font-size due to need for padding.
    @include size($space-8, 100%);
    padding-inline: $space-2;

    &--active {
        border-radius: $border-radius;
        background-color: rgba($color-foreground, $opacity-very-low);
    }

    &:first-child {
        inline-size: r(43);
    }

    &:nth-child(2) {
        inline-size: r(33);
    }

    &:nth-child(3) {
        inline-size: r(29);
    }
}

.menu-bar__image-siri {
    @include size(r(14));
    margin-inline-start: -$space-2;
}

.menu-bar__date {
    margin-inline-end: -$space-2;
}
</style>
