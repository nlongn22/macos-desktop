<template>
    <ControlCentreModule class="mini">
        <template #content>
            <Icon
                :name="props.iconName"
                class="mini__icon"
            />
            <span class="mini__text-first">
                {{ props.textFirst }}
            </span>
            {{ props.textSecond }}
        </template>
    </ControlCentreModule>
</template>

<script setup lang="ts">
interface MiniProps {
    iconName: string,
    textFirst: string,
    textSecond: string
}

const props = defineProps<MiniProps>();
</script>

<style lang="scss" scoped>
.mini {
    padding-block: $space-2;
    text-align: center;
    font-size: r(10);
}

.mini__icon {
    font-size: r(22);
    color: rgba($color-foreground, $opacity-high);
}

.mini__text-first {
    display: block;
    margin-block: -$space-2;
}
</style>
