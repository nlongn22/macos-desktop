<template>
    <MenuBarModule class="wifi">
        <template #title>
            Wi-Fi
        </template>

        <template #additional-info>
            BUTTON
        </template>

        <template #content>
            <p class="wifi__known">
                Known Network
            </p>
            <MenuBarWifiSelector
                v-for="(network, index) in knownNetworks"
                :key="index"
                :name="network"
                :is-connected="network === connectedNetwork"
                class="wifi__selector-known"
                @connection-change="toggleKnownConnection"
            />
            <hr>
            <div
                class="wifi__other hover-effect"
                @click="openDropdown"
            >
                Other Networks
                <Icon
                    name="chevron-right"
                    class="wifi__icon-chevron"
                    :class="{ 'wifi__icon-chevron--active' : isDropdownActive }"
                />
            </div>
            <div
                v-if="isDropdownActive"
                class="wifi__dropdown"
            >
                <MenuBarWifiSelector
                    v-for="(network, index) in otherNetworks"
                    :key="index"
                    :name="network"
                    class="wifi__selector-other"
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
    </MenuBarModule>
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
.wifi {
    transform: translate(-74.5%, 100%);
}

.wifi__known,
.wifi__other {
    font-weight: $font-weight-semibold;
}

.wifi__other {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.wifi__icon-chevron {
    font-size: r(10);

    &--active {
        transform: rotate(90deg);
    }
}

.wifi__dropdown {
    display: flex;
    flex-direction: column;
    row-gap: r(6);
}
</style>
