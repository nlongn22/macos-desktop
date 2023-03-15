<template>
    <div class="stage-manager-module control-centre-module">
        <Icon
            name="table"
            class="stage-manager-module__icon"
        />
        <span class="stage-manager-module__text">
            Stage
        </span>
        Manager
    </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.stage-manager-module {
    inline-size: 50%;
    block-size: 100%;
    padding-block: $space-2;
    text-align: center;
    font-size: r(10);
}

.stage-manager-module__icon {
    font-size: $space-5;
    color: rgba($color-foreground, $opacity-high);
}

.stage-manager-module__text {
    display: block;
    margin-block-start: r(-6);
    margin-block-end: r(-8);
}
</style>
