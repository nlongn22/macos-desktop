<template>
    <Module class="battery-module">
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
    </Module>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.battery-module {
    inline-size: r(310);
    transform: translateY(100%);
}
</style>
