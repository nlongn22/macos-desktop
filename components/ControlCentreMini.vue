<template>
    <div class="mini control-centre-module">
        <Icon
            :name="props.iconName"
            class="mini__icon"
        />
        <span class="mini__text-first">
            {{ props.textFirst }}
        </span>
        {{ props.textSecond }}
    </div>
</template>

<script setup lang="ts">
interface ControlCentreMiniProps {
    iconName: string,
    textFirst: string,
    textSecond: string
}

const props = defineProps<ControlCentreMiniProps>();
</script>

<style lang="scss" scoped>
.mini {
    inline-size: 50%;
    block-size: 100%;
    padding-block: $space-2;
    text-align: center;
    font-size: r(10);
}

.mini__icon {
    font-size: $space-5;
    color: rgba($color-foreground, $opacity-high);
}

.mini__text-first {
    display: block;
    margin-block-start: r(-6);
    margin-block-end: r(-8);
}
</style>
