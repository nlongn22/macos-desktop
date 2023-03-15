<template>
    <Dialog class="control-centre">
        <ControlCentreConnectivities />
        <div class="control-centre__right">
            <ControlCentreFocus />
            <div class="control-center__subright">
                <ControlCentreStageManager />
                <ControlCentreStageManager />
            </div>
        </div>
    </Dialog>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.control-centre {
    transform: translate(-1%, 60%);
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
