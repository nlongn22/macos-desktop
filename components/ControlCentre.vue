<template>
    <Dialog class="control-centre">
        <div class="control-centre__top">
            <ControlCentreConnectivities />
            <div class="control-centre__right">
                <ControlCentreFocus />
                <div class="control-center__subright">
                    <ControlCentreMini
                        icon-name="squares-leading-rectangle"
                        text-first="Stage"
                        text-second="Manager"
                    />
                    <ControlCentreMini
                        icon-name="rectangle-on-rectangle"
                        text-first="Screen"
                        text-second="Mirroring"
                    />
                </div>
            </div>
        </div>

        <ControlCentreSlider
            title="Display"
            primary-icon-name="sun-max-fill"
        />

        <ControlCentreSlider
            title="Sound"
            primary-icon-name="speaker-wave-3-fill"
            secondary-icon-name="airplayaudio"
        />

        <ControlCentreMusic />
    </Dialog>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.control-centre {
    transform: translate(-4%, 55%);
    inline-size: r(300);
    display: flex;
    flex-direction: column;
    row-gap: r(10);
    padding: r(10);
    border-radius: $border-radius-2xl;
}

.control-centre__top,
.control-centre__right,
.control-center__subright {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: r(10);
}

.control-centre__right {
    grid-template-rows: 1fr 1fr;
    grid-template-columns: unset;
}
</style>
