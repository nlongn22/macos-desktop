<template>
    <div class="stage-manager control-centre-module">
        <Icon
            name="table"
            class="stage-manager__icon"
        />
        <span class="stage-manager__text">
            Stage
        </span>
        Manager
    </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.stage-manager {
    inline-size: 50%;
    block-size: 100%;
    padding-block: $space-2;
    text-align: center;
    font-size: r(10);
}

.stage-manager__icon {
    font-size: $space-5;
    color: rgba($color-foreground, $opacity-high);
}

.stage-manager__text {
    display: block;
    margin-block-start: r(-6);
    margin-block-end: r(-8);
}
</style>
