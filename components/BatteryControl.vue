<template>
    <Control class="battery-control">
        <template #title>
            Battery
        </template>

        <template #additional-info>
            100 %
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
    </Control>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.battery-control {
    inline-size: r(310);
    transform: translateY(100%);
}
</style>
