<template>
    <div class="launchpad">
        <NuxtImg
            :src="`/images/wallpapers/${wallpaper()}.png`"
            class="launchpad__background"
        />

        <div class="launchpad__programs">
            <div
                v-for="(program, index) in programs"
                :key="index"
                class="launchpad__program"
                @click="globalStore.addProgramToDock(program)"
            >
                <NuxtPicture
                    preload
                    :src="`/images/programs/${program}.png`"
                    :img-attrs="{ class: 'launchpad__program-image' }"
                />
                <span class="launchpad__program-title">
                    {{ program }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from '~/store/global';

const { $gsap } = useNuxtApp();

const globalStore = useGlobalStore();
const colorMode = useColorMode();

const programs = [
    'settings',
    'safari',
    'calculator',
    'messages',
    'notes',
];

function wallpaper(): string {
    return colorMode.value === 'light' ?
        globalStore.wallpaper + '-light' :
        globalStore.wallpaper + '-dark';
}

onMounted(() => {
    $gsap.fromTo('.launchpad__programs',
        {
            scale: 1.05,
            duration: 0.4,
        },
        {
            scale: 1,
            duration: 0.4,
        },
    );
});

onBeforeUnmount(() => {
    $gsap.to('.launchpad__programs', {
        scale: 1.05,
        duration: 0.4,
    });
});
</script>

<style lang="scss" scoped>
.launchpad,
.launchpad__background,
.launchpad__programs {
    @include size(100%);
    position: absolute;
    inset-inline-start: 50%;
    inset-block-start: 50%;
    transform: translate(-50%, -50%);
    backdrop-filter: $blur-xl brightness(0.6) saturate(200%);
    background-color: rgba($color-background, $opacity-very-low);
    z-index: 99999;
}

.launchpad__background {
    object-fit: cover;
}

.launchpad__programs {
    display: flex;
    flex-wrap: wrap;
    column-gap: r(106);
    row-gap: $space-17;
    padding-inline: r(142);
    padding-block: $space-20;
}

.launchpad__program {
    display: flex;
    flex-direction: column;
    align-items: center;
}

:deep(.launchpad__program-image) {
    @include size($space-18);
}

.launchpad__program-title {
    text-transform: capitalize;
    color: $color-background;
}
</style>
