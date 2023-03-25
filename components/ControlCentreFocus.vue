<template>
    <ControlCentreModule
        has-additional-icon
        has-chevron
        class="focus"
    >
        <template #icon>
            <div class="colored-icon__background">
                <Icon
                    name="moon-fill"
                    class="colored-icon"
                />
            </div>
        </template>

        <template #title>
            Focus
        </template>
    </ControlCentreModule>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.focus {
    display: flex;
    align-items: center;
}
</style>
