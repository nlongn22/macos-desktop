<template>
    <Dialog class="control-centre">
        <ConnectivityModule />
        <div class="control-centre__right">
            <FocusModule />
            <div class="control-center__subright">
                <StageManagerModule />
                <StageManagerModule />
            </div>
        </div>
    </Dialog>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.control-centre {
    inset-inline-start: 0;
    inset-block-end: -$space-1;
    transform: translate(2%, 100%);
    inline-size: r(300);
    display: flex;
    gap: r(10);
    padding: r(10);
    border-radius: $border-radius-2xl;
}

.control-centre__right {
    display: flex;
    flex-direction: column;
    flex-basis: 50%;
    gap: r(10);
}

.control-center__subright {
    block-size: r(62.5);
    display: flex;
    gap: r(10);
}
</style>
