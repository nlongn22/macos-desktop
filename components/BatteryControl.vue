<template>
    <Modal class="battery-control">
        <div class="battery-control__level">
            <span class="battery-control__title">
                Battery
            </span>
            <span>
                100 %
            </span>
        </div>
        <p>
            Power Source: Battery
        </p>
        <hr>
        <p>
            No Apps Using Significant Energy
        </p>
        <hr>
        <p class="battery-control__settings">
            Battery Settings...
        </p>
    </Modal>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.battery-control {
    position: absolute;
    inset-inline-start: 0;
    inset-block-end: 0;
    transform: translateY(100%);
    display: flex;
    flex-direction: column;
    row-gap: $space-0;
    inline-size: r(295);
    min-inline-size: max-content;
    font-size: r(13);
    color: $color-gray-100;

    & > :last-child {
        color: $color-foreground;
    }
}

.battery-control__level {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.battery-control__title {
    font-weight: $font-weight-bold;
    color: $color-foreground;
}

.battery-control__settings {
    margin-inline-start: r(-8);
    padding-inline: r(8);
    border-radius: $border-radius-xs;

    @include has-hover {
        backdrop-filter: $contrast-high;
    }
}
</style>
