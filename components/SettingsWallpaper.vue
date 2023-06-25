<template>
    <div class="wallpaper">
        <div class="wallpaper__dynamic">
            <div class="wallpaper__dynamic-title">
                Dynamic Wallpapers
            </div>
            <div class="wallpaper__dynamic-images">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.wallpaper {
    block-size: 100%;
    margin-inline: -$space-5;
    padding-inline: $space-5;
    border-block-start: $border-width-thin solid $color-border;
    background-color: $color-white-200;
}

.wallpaper__dynamic-title {
    margin-block-start: $space-6;
    font-weight: $font-weight-medium;
    color: $color-gray-100;
}
</style>
