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
                    class="connectivity__icon colored-icon colored-icon--active"
                />
            </div>
            <ul>
                <li class="control-centre-module__title control-centre-module__title--has-icon">
                    {{ connectivity.name }}
                    <Icon
                        name="chevron-right"
                        class="control-centre-module__icon"
                    />
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    row-gap: $space-2;
}

.connectivity {
    display: flex;
    align-items: center;
    column-gap: $space-2;
}

.connectivity__icon {
    @include size(55%);
}

.connectivity__state {
    margin-block-start: r(-6);
    opacity: $opacity-high;
    font-size: r(11);
}
</style>
