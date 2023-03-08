<template>
    <main class="dock">
        <NuxtImg
            v-for="(program, key) in programs"
            :key="key"
            :src="`/programs/${program}.png`"
            class="dock__program"
        />
    </main>
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
    border-radius: $border-radius-l;
    border: $border-width-ultra-thin solid rgba($color-border-darker, $opacity-medium);
    backdrop-filter: $blur-medium;
    background: rgba($color-background, $opacity-medium);
}

.dock__program {
    @include size(r(55));
}
</style>
