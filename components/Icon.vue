<script setup lang="ts">
const props = defineProps<{ name: string }>();
const icon = defineAsyncComponent(() => import(`@/assets/icons/${props.name}.svg?component`));
</script>

<template>
    <component
        :is="icon"
        v-show="icon"
    />
</template>
