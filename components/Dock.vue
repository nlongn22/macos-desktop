<template>
    <div class="dock">
        <NuxtImg
            v-for="(program, key) in programs"
            :key="key"
            :src="`/programs/${program}.png`"
            class="dock__program"
        />
    </div>
</template>

<script setup lang="ts">
const programs = [
    'finder', 'launchpad', 'calculator',
    'calendar', 'clock', 'contacts',
    'facetime', 'messages', 'notes',
    'photos', 'reminders', 'safari',
];
</script>

<style lang="scss" scoped>
.dock {
    position: absolute;
    inset-block-end: 0;
    inset-inline-start: 50%;
    transform: translate(-50%, -5%);
    width: max-content;
    display: flex;
    column-gap: r(14);
    padding: r(10);
    border-radius: r(20);
    border: r(0.1) solid $color-gray-000;
    backdrop-filter: blur(r(25));
    background-color: rgba($color-white-000, 0.25);
}

.dock__program {
    @include size(r(55));
}
</style>
