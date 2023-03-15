<template>
    <Module class="wifi-module">
        <template #title>
            Wi-Fi
        </template>

        <template #additional-info>
            BUTTON
        </template>

        <template #content>
            <p class="wifi-module__known">
                Known Network
            </p>
            <WifiSelector
                v-for="(network, index) in knownNetworks"
                :key="index"
                :name="network"
                :is-connected="network === connectedNetwork"
                class="wifi-module__selector-known"
                @connection-change="toggleKnownConnection"
            />
            <hr>
            <div
                class="wifi-module__other hover-effect"
                @click="openDropdown"
            >
                Other Networks
                <Icon
                    name="chevron"
                    class="wifi-module__icon-chevron"
                    :class="{ 'wifi-module__icon-chevron--active' : isDropdownActive }"
                />
            </div>
            <div
                v-if="isDropdownActive"
                class="wifi-module__dropdown"
            >
                <WifiSelector
                    v-for="(network, index) in otherNetworks"
                    :key="index"
                    :name="network"
                    class="wifi-module__selector-other"
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
    </Module>
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
.wifi-module {
    transform: translate(-72.5%, 100%);
}

.wifi-module__known,
.wifi-module__other {
    font-weight: $font-weight-semibold;
}

.wifi-module__other {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.wifi-module__icon-chevron {
    font-size: $space-4;

    &--active {
        transform: rotate(90deg);
    }
}

.wifi-module__dropdown {
    display: flex;
    flex-direction: column;
    row-gap: r(6);
}
</style>
