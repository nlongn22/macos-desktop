<template>
    <ControlCentreModule class="connectivities">
        <template #content>
            <div
                v-for="(connectivity, index) in connectivities"
                :key="index"
                class="connectivity"
            >
                <div class="colored-icon__background colored-icon__background--active">
                    <Icon
                        :name="connectivity.type"
                        class="connectivity__icon-connection colored-icon colored-icon--active"
                    />
                </div>
                <ul>
                    <li class="connectivity__header">
                        {{ connectivity.name }}
                    </li>
                    <li class="connectivity__state">
                        {{ connectivity.state }}
                    </li>
                </ul>
                <Icon
                    name="chevron-right"
                    class="connectivity__icon-chevron"
                />
            </div>
        </template>
    </ControlCentreModule>
</template>

<script setup lang="ts">
interface Connectivity {
    type: string,
    name: string,
    state: string,
}

const connectivities: Connectivity[] = [
    {
        type: 'wifi',
        name: 'Wi-Fi',
        state: 'Internet_24',
    },
    {
        type: 'bluetooth',
        name: 'Bluetooth',
        state: 'On',
    },
    {
        type: 'airdrop',
        name: 'AirDrop',
        state: 'Everyone',
    },
];
</script>

<style lang="scss" scoped>
.connectivities {
    display: flex;
    flex-direction: column;
    justify-content: center;
    row-gap: $space-2;
    padding-block-start: $space-0;
}

.connectivity {
    position: relative;
    display: flex;
    align-items: center;
    column-gap: $space-2;

    @include has-hover {

        .connectivity__icon-chevron {
            opacity: 1;
        }
    }
}

.connectivity__icon-connection {
    @include size(55%);
}

.connectivity__header {
    font-size: $space-3;
    font-weight: $font-weight-medium;
    color: $color-foreground;
}

.connectivity__icon-chevron {
    position: absolute;
    inset-block-start: 50%;
    inset-inline-end: 0;
    transform: translateY(-50%);
    opacity: 0;
    font-size: r(10);
    color: rgba($color-foreground, $opacity-medium);
}

.connectivity__state {
    margin-block-start: r(-6);
    opacity: $opacity-high;
    font-size: r(11);
}
</style>
