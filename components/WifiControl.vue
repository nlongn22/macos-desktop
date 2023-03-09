<template>
    <Control class="wifi-control">
        <template #title>
            Wi-Fi
        </template>

        <template #additional-info>
            BUTTON
        </template>

        <template #content>
            <p class="wifi-control__known">
                Known Network
            </p>
            <WifiSelector
                v-for="(network, index) in knownNetworks"
                :key="index"
                :name="network"
                :is-connected="network === connectedNetwork"
                class="wifi-control__selector-known"
                @connection-change="toggleKnownConnection"
            />
            <hr>
            <div
                class="wifi-control__other hover-effect"
                @click="openDropdown"
            >
                Other Networks
                <Icon
                    name="chevron"
                    class="wifi-control__icon-chevron"
                    :class="{ 'wifi-control__icon-chevron--active' : isDropdownActive }"
                />
            </div>
            <div
                v-if="isDropdownActive"
                class="wifi-control__dropdown"
            >
                <WifiSelector
                    v-for="(network, index) in otherNetworks"
                    :key="index"
                    :name="network"
                    class="wifi-control__selector-other"
                    @connection-change="toggleOtherConnection"
                />
                <p class="text-default hover-effect">
                    Other...
                </p>
            </div>
        </template>

        <template #settings-link>
            Wi-Fi settings...
        </template>
    </Control>
</template>

<script setup lang="ts">
const isDropdownActive = ref(false);
const connectedNetwork = ref('Internet_24');
const knownNetworks = ref([
    'Internet_24',
]);
const otherNetworks = ref([
    'Internet_1237',
    'wifinaaaaa',
    'CEZ_NET',
    ':-)',
    'freenet',
    'Cheb',
    'SauronNet219',
]);

function toggleKnownConnection(name: string): void {
    if (connectedNetwork.value === name) {
        connectedNetwork.value = '';
        return;
    }

    connectedNetwork.value = name;
}

function toggleOtherConnection(name: string): void {
    connectedNetwork.value = name;
    knownNetworks.value.unshift(name);
    otherNetworks.value = otherNetworks.value.filter((network: string) => network !== name);
}

function openDropdown(): void {
    isDropdownActive.value = !isDropdownActive.value;
}
</script>

<style lang="scss" scoped>
.wifi-control {
    inline-size: r(295);
    transform: translate(-72.5%, 100%);
}

.wifi-control__known,
.wifi-control__other {
    font-weight: $font-weight-semibold;
}

.wifi-control__other {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.wifi-control__icon-chevron {
    inline-size: $space-4;
    block-size: $space-4;

    &--active {
        transform: rotate(90deg);
    }
}

.wifi-control__dropdown {
    display: flex;
    flex-direction: column;
    row-gap: $space-1;
}
</style>
