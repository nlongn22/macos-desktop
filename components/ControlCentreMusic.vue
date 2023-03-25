<template>
    <ControlCentreModule
        class="music"
        has-additional-icon
    >
        <template #icon>
            <div class="music__image-background">
                <NuxtImg
                    :src="`/programs/music.png`"
                    class="music__image"
                />
            </div>
        </template>

        <template #title>
            Music
        </template>

        <template #content>
            <div class="music__controls">
                <Icon
                    name="play-fill"
                    class="music__icon-play"
                />
                <Icon
                    name="forward-fill"
                    class="music__icon-forward"
                />
            </div>
        </template>
    </ControlCentreModule>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.music {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.music__image-background {
    display: grid;
    place-items: center;
    padding: $space-3;
    border-radius: $border-radius-sm;
    background-color: rgba($color-foreground, $opacity-very-low);
}

.music__image {
    @include size($space-4);
}

.music__controls {
    display: flex;
    align-items: center;
    column-gap: $space-2;
}

.music__icon-play {
    color: rgba($color-foreground, $opacity-high);
}

.music__icon-forward {
    font-size: $space-4;
    color: rgba($color-foreground, $opacity-medium);
}
</style>
