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
    display: flex;
    width: max-content;
    column-gap: $space-3;
    padding: $space-3;
    border-radius: $border-radius-xl;
    border: $border-width-ultra-thin solid rgba($color-border-darker, $opacity-medium);
    backdrop-filter: $blur-medium;
    background: rgba($color-background, $opacity-medium);
}

.dock__program {
    inline-size: $space-14;
    block-size: $space-14;
}
</style>
