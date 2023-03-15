<template>
    <div class="connectivities control-centre-module">
        <div
            v-for="(connectivity, index) in connectivities"
            :key="index"
            class="connectivity"
        >
            <div class="colored-icon__background colored-icon__background--active">
                <Icon
                    :name="connectivity.type"
                    class="colored-icon colored-icon--active"
                />
            </div>
            <ul>
                <li class="control-centre-module__title">
                    {{ connectivity.name }}
                </li>
                <li class="connectivity__state">
                    {{ connectivity.state }}
                </li>
            </ul>
        </div>
    </div>
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
        state: 'Contacts Only',
    },
];
</script>

<style lang="scss" scoped>
.connectivities {
    block-size: max-content;
    display: flex;
    flex-direction: column;
    flex-basis: 50%;
    row-gap: $space-2;
}

.connectivity {
    display: flex;
    align-items: center;
    column-gap: $space-2;
}

.connectivity__state {
    margin-block-start: r(-6);
    opacity: $opacity-high;
    font-size: r(11);
}
</style>
