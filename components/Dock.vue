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
            :class="{ 'dock__program--active' : isProgramActive(program) }"
        >
            <NuxtImg
                :src="`/programs/${program}.png`"
                class="dock__program-image"
            />
            <div class="dock__program-dot" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from '~/store/global';

const globalStore = useGlobalStore();
const { $gsap, $Draggable } = useNuxtApp();

const programs = globalStore.dock;

const staticPrograms: string[] = ['finder', 'launchpad', 'trash'];

const dockRef: Ref<HTMLElement | undefined> = ref();

const isDragging = ref(false);

function isStaticProgram(programName: string): boolean {
    return staticPrograms.includes(programName);
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
    if (isStaticProgram(program.id)) {
        return;
    }

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

            if (isStaticProgram(this.target.id)) {
                this.endDrag(this.target);
                return;
            }

            // Prevent unnecessary DOM updates.
            if (
                !isOutOfBoundY(this.y, 50) &&
                !isStaticProgram(this.target.id) &&
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

    globalStore.saveDockOrder([...programs].map(({ id }) => id));
}

function openProgram(program: HTMLElement): void {
    if (isStaticProgram(program.id)) {
        return;
    }

    const tl = $gsap.timeline({
        onComplete: () => {
            globalStore.openProgram(program.id);
        },
    });

    tl.to(program, { y: -20, duration: 0.5 });
    tl.to(program, { y: 0 });
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
    inset-block-end: 0;
    inset-inline-start: 50%;
    transform: translate(-50%, -5%);
    inline-size: max-content;
    display: flex;
    align-items: center;
    column-gap: $space-3;
    padding-inline: r(10);
    padding-block: $space-2;
    border-radius: $border-radius-3xl;
    border: $border-width-thin solid rgba($color-border, $opacity-low);
    backdrop-filter: $blur-xl;
    box-shadow: rgba($color-foreground, $opacity-low) 0 r(30) r(90);
    background-color: rgba($color-background, $opacity-low);
}

.dock__program {
    position: relative;

    &--active {
        .dock__program-dot {
            visibility: visible;
        }
    }

    &:last-child {
        .dock__program-image {
            @include size($space-19, auto);
            margin-inline-start: $space-1;
            margin-inline-end: -$space-3;
            padding-inline-start: $space-2;
            border-inline-start: $border-width-thin solid rgba($color-foreground, $opacity-low);
        }
    }
}

.dock__program-image {
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
</style>
