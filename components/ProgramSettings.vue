<template>
    <Program
        :draggable-elements="[settingsNavbarRef]"
        class="settings"
    >
        <div class="settings__sidebar">
            <div
                ref="settingsNavbarRef"
                class="settings__navbar"
            >
                <ProgramDots program-name="system-settings" />
            </div>
        </div>

        <div class="settings__main">
            Appearance
        </div>
    </Program>
</template>

<script setup lang="ts">
const settingsNavbarRef: Ref<HTMLElement | undefined> = ref();
</script>

<style lang="scss" scoped>
.settings {
    display: flex;
    backdrop-filter: $blur-xl;
    background-color: rgba($color-white-100, $opacity-very-high);
}

.settings__sidebar {
    inline-size: r(300);
    border-inline-end: $border-width-thin solid rgba($color-gray, $opacity-low);
    background-color: rgba($color-gray, $opacity-very-low);
}

.settings__navbar {
    @include size(100%, $space-13);
    display: flex;
    padding-inline: $space-6;
    padding-block-start: $space-2;
    padding-block-end: $space-3;
}

.settings__main {
    inline-size: 100%;
    background-color: $color-white-100;
}
</style>
