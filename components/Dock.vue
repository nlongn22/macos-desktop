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
    border-radius: $border-radius-3xl;
    border: $border-width-thin solid rgba($color-border-primary, $opacity-low);
    backdrop-filter: $blur-xl;
    box-shadow: rgba($color-foreground, $opacity-low) 0 r(30) r(90);
    background-color: rgba($color-background, $opacity-low);
}

.dock__program {
    inline-size: $space-14;
    block-size: $space-14;
}
</style>
