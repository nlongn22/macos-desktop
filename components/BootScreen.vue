<template>
    <div class="boot-screen">
        <Icon
            name="apple-logo"
            class="boot-screen__logo"
        />
        <div class="boot-screen__progress-background">
            <div class="boot-screen__progress-foreground" />
        </div>
    </div>
</template>

<script setup lang="ts">
// eslint-disable-next-line func-call-spacing
const emits = defineEmits<{
    (e: 'loadingHasFinished', isFinished: boolean): void
}>();

function hideBootScreen(): void {
    emits('loadingHasFinished', true);
}

onMounted(() => {
    setTimeout(() => {
        hideBootScreen();
    }, 5000);
});
</script>

<style lang="scss" scoped>
.boot-screen {
    @include size(100vw, 100vh);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: $color-foreground;
}

.boot-screen__logo {
    margin-block-end: $space-18;
    font-size: $space-24;
    color: $color-background;
}

.boot-screen__progress-background {
    inline-size: r(300);
    block-size: $space-2;
    border-radius: $border-radius-md;
    overflow: hidden;
    background-color: rgba($color-gray, $opacity-medium);
}

.boot-screen__progress-foreground {
    block-size: 100%;
    background-color: $color-white;
    animation: 5s ease-in loading;
}

@keyframes loading {
    from {
        inline-size: 0;
    }

    to {
        inline-size: 100%;
    }
}
</style>
