<template>
    <MenuBarModule class="battery">
        <template #title>
            Battery
        </template>

        <template #additional-info>
            75 %
        </template>

        <template #content>
            <p>
                Power Source: Battery
            </p>
            <hr>
            <p>
                No Apps Using Significant Energy
            </p>
        </template>

        <template #settings-link>
            Battery Settings...
        </template>
    </MenuBarModule>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.battery {
    transform: translate(-85%, 100%);
}
</style>
