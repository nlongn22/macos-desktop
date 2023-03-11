<template>
    <div
        class="wifi-selector hover-effect"
        @click="toggleConnection"
    >
        <div
            class="wifi-selector__icon-wifi-background"
            :class="{ 'wifi-selector__icon-wifi-background--active' : props.isConnected }"
        >
            <Icon
                name="wifi"
                class="wifi-selector__icon-wifi"
            />
        </div>

        <span class="wifi-selector__wifi-name text-default">
            {{ props.name }}
        </span>

        <Icon
            v-if="isLockVisible()"
            name="lock"
            class="wifi-selector__icon-lock"
        />
    </div>
</template>

<script setup lang="ts">
interface IProps {
    name: string,
    isConnected?: boolean
}

const props = defineProps<IProps>();

// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
    (e: 'connectionChange', name: string): void
}>();

function toggleConnection(): void {
    emit('connectionChange', props.name);
}

function isLockVisible(): number {
    return Math.round(Math.random());
}
</script>

<style lang="scss" scoped>
.wifi-selector {
    display: flex;
    align-items: center;
    column-gap: $space-2;
}

.wifi-selector__icon-wifi-background {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: r(6);
    border-radius: $border-radius-full;
    color: $color-foreground;
    background-color: rgba($color-gray-100, $opacity-low);

    &--active {
        color: $color-background;
        background-color: $color-blue-100;
    }
}

.wifi-selector__icon-wifi,
.wifi-selector__icon-lock {
    inline-size: $space-4;
    block-size: $space-4;
}

.wifi-selector__wifi-name {
    margin-inline-end: auto;
}
</style>
