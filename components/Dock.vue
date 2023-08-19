<template>
    <div
        ref="dockRef"
        class="dock"
    >
        <div
            v-for="(program, index) in programs"
            :id="program"
            :key="index"
            class="dock__program"
            :class="{ 'dock__program--active': isProgramActive(program) }"
        >
            <NuxtPicture
                preload
                :src="`/images/programs/${program}.png`"
                :img-attrs="{ class: 'dock__program-image' }"
            />

            <div class="dock__program-dot" />
        </div>

        <div class="dock__minimized-programs">
            <NuxtPicture
                preload
                src="/images/programs/trash.png"
                :img-attrs="{ class: 'dock__program-image' }"
                class="dock__program-trash"
            />
            <div
                v-for="(program, index) in globalStore.activePrograms"
                :id="'minimized-' + program"
                :key="index"
                class="dock__minimized-program"
                @click="globalStore.revealProgram(program)"
            >
                <NuxtPicture
                    preload
                    :src="`/images/programs/${program}.png`"
                    :img-attrs="{ class: 'dock__minimized-program-image' }"
                    class="dock__minimized-thumbnail"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from '~/store/global';

const globalStore = useGlobalStore();
const { $gsap, $Draggable } = useNuxtApp();

const programs = globalStore.dock;

const wipPrograms = ['finder', 'launchpad', 'messages', 'notes', 'trash'];

const dockRef: Ref<HTMLElement | undefined> = ref();
const isDragging = ref(false);

function isEdgeProgram(position: number): boolean {
    return (position === 0 || position === programs.length);
}

function isOutOfBoundX(currentPosition: number): boolean {
    return Math.abs(currentPosition) > 100;
}

function isOutOfBoundY(currentPosition: number, boundSize: number): boolean {
    return Math.abs(currentPosition) >= boundSize;
}

function updateBrightness(program: HTMLElement, brightness = 1): void {
    $gsap.set(program, { filter: `brightness(${brightness})` });
}

function updateOpacity(program: HTMLElement, opacity = 1): void {
    $gsap.to(program, { opacity, duration: 0.35 });
}

function updateMargin(program: HTMLElement, margin = 0): void {
    $gsap.to(program, {
        marginInline: margin,
        duration: 0.15,
        ease: 'linear',
    });
}

function updateDOM(
    program: HTMLElement,
    newPosition: number,
    insertType = 'before',
): void {
    const relativeProgram = dockRef.value?.children[newPosition] as any;
    relativeProgram?.[insertType](program);
    saveProgramsOrder();
}

function initDock(): void {
    $Draggable.create('.dock__program', {
        cursor: 'revert',
        activeCursor: 'revert',
        bounds: '.container',
        onPress: function() {
            updateBrightness(this.target, 0.5);
        },
        onRelease: function() {
            updateBrightness(this.target);
        },
        onClick: function() {
            openProgram(this.target);
        },
        onDragStart: function() {
            isDragging.value = true;
            updateBrightness(this.target);
        },
        onDrag: function() {
            if (isOutOfBoundY(this.y, 150)) {
                updateOpacity(this.target, 0.4);
            } else {
                updateOpacity(this.target);
            }

            if (isOutOfBoundX(this.x) || isOutOfBoundY(this.y, 50)) {
                updateMargin(this.target, -34);
            } else {
                updateMargin(this.target);
            }

            const currentPosition = Array.prototype.indexOf.call(dockRef.value?.children, this.target);
            const relativePosition = Math.round(this.x / 68);
            const newPosition = currentPosition + relativePosition;

            if (isEdgeProgram(currentPosition)) {
                this.endDrag(this.target);
                return;
            }

            // Prevent unnecessary DOM updates.
            if (
                !isOutOfBoundY(this.y, 50) &&
                !isEdgeProgram(newPosition) &&
                currentPosition !== newPosition
            ) {
                if (this.x < 0) {
                    updateDOM(this.target, newPosition);
                } else {
                    updateDOM(this.target, newPosition, 'after');
                }
            }

            this.update(true, true);
        },
        onDragEnd: function() {
            isDragging.value = false;

            if (isOutOfBoundY(this.y, 150)) {
                this.target.remove();
                saveProgramsOrder();
            }

            updateMargin(this.target);

            $gsap.to(this.target, {
                x: 0,
                y: 0,
                duration: 0.35,
                ease: 'linear',
            });
        },
    });
}

function saveProgramsOrder(): void {
    const programs = dockRef.value?.children;

    if (!programs) {
        return;
    }

    globalStore.saveDockOrder([...programs].slice(0, -1).map(({ id }) => id));
}

function openProgram(program: HTMLElement): void {
    if (wipPrograms.includes(program.id)) {
        return;
    }

    if (globalStore.isProgramMinimized(program.id)) {
        globalStore.revealProgram(program.id);
    }

    globalStore.focusProgram(program.id);

    if (globalStore.activePrograms.includes(program.id)) {
        return;
    }

    const tl = $gsap.timeline();

    tl.to(program, { y: -20, duration: 0.5 });
    tl.to(program, { y: 0 });
    tl.then(() => {
        globalStore.openProgram(program.id);
    });
}

function isProgramActive(programName: string): boolean {
    return !isDragging.value && globalStore.isProgramActive(programName);
}

onMounted(() => {
    initDock();
});
</script>

<style lang="scss" scoped>
.dock {
    position: absolute;
    inset-block-end: $space-1;
    inset-inline-start: 50%;
    transform: translateX(-50%);
    inline-size: max-content;
    display: flex;
    align-items: center;
    column-gap: $space-4;
    padding-inline: r(10);
    padding-block: $space-2;
    border-radius: $space-5;
    border: $border-width-thin solid $color-border;
    backdrop-filter: $blur-xl;
    box-shadow: rgba($color-foreground, $opacity-low) 0 r(30) r(90);
    background-color: rgba($color-background, $opacity-low);
    z-index: 99999;
}

.dock__program {
    &:first-child,
    &--active {
        .dock__program-dot {
            visibility: visible;
        }
    }
}

:deep(.dock__program-image) {
    @include size($space-13);
}

.dock__program-dot {
    @include size($space-1);
    position: absolute;
    inset-inline-start: 50%;
    inset-block-end: 0;
    transform: translate(-50%, 200%);
    border-radius: $border-radius-full;
    visibility: hidden;
    background-color: rgba($color-black, $opacity-high);
}

.dock__minimized-programs {
    display: flex;
    column-gap: $space-4;
    align-items: center;
    margin-inline-start: $space-2;
    padding-inline-start: $space-4;
    border-inline-start: $border-width-thin solid rgba($color-foreground, $opacity-low);

    .dock__program-trash {
        order: 1;

        &:deep(.dock__program-image) {
            @include size(r(50), auto);
        }
    }
}

.dock__minimized-program {
    position: relative;
    // Add negative inline margin due to weird whitespace.
    margin-inline: -$space-2;
    overflow: visible;
}

.dock__minimized-thumbnail {
    position: absolute;
    inset-block-start: 60%;
    inset-inline-start: 70%;
    opacity: 0;
}

:deep(.dock__minimized-program-image) {
    @include size($space-5);
    max-inline-size: unset;
}
</style>
