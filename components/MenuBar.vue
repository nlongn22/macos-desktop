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
            <Icon
                v-for="(iconName, index) in controlCenterIcons"
                :key="index"
                :name="iconName"
                class="menu-bar__icon-control"
            />
            <NuxtImg
                src="programs/siri.png"
                class="menu-bar__image-siri"
            />
            <span class="menu-bar__date">
                Tue 7. 3. 0:52
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
const programOptions = ['Finder', 'File', 'Edit', 'View', 'Go', 'Window', 'Help'];
const controlCenterIcons = ['battery', 'wifi', 'finder', 'control-center'];
</script>

<style lang="scss" scoped>
.menu-bar {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: space-between;
    inline-size: 100%;
    padding-inline: r(18);
    padding-block: r(1);
    background-color: rgba($color-white-000, 0.7);
}

.menu-bar__left {
    display: flex;
    align-items: center;
}

.menu-bar__icon-apple {
    @include size($space-2);
    margin-inline-end: r(18);
    margin-block-end: r(2);
}

.menu-bar__program-options {
    display: flex;
    align-items: center;
    column-gap: r(18);
    color: $color-black;
}

.menu-bar__program-option:first-child {
    font-weight: 700;
}

.menu-bar__right {
    display: flex;
    align-items: center;
    column-gap: r(18);
}

.menu-bar__icon-control {
    @include size($space-2);
}

.menu-bar__image-siri {
    @include size(r(16));
}

.menu-bar__program-option,
.menu-bar__date {
    font-size: r(14);
}
</style>
