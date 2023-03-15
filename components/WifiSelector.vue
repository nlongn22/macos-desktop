<template>
    <div
        class="wifi-selector hover-effect"
        @click="toggleConnection"
    >
        <div
            class="colored-icon__background"
            :class="{ 'colored-icon__background--active' : props.isConnected }"
        >
            <Icon
                name="wifi"
                class="colored-icon"
                :class="{ 'colored-icon--active' : props.isConnected }"
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

.wifi-selector__icon-lock {
    font-size: $space-4;
}

.wifi-selector__wifi-name {
    margin-inline-end: auto;
}
</style>
