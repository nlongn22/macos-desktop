<template>
    <div
        ref="dockRef"
        class="dock"
    >
        <NuxtImg
            v-for="(program, index) in programs"
            :key="index"
            :src="`/programs/${program}.png`"
            class="dock__program"
        />
    </div>
</template>

<script setup lang="ts">
const { $gsap, $Draggable } = useNuxtApp();

const programs = [
    'finder', 'launchpad', 'calculator',
    'calendar', 'clock', 'contacts',
    'facetime', 'messages', 'notes',
    'photos', 'reminders', 'safari',
];
const dockRef = ref();

function isOutOfBound(currentPosition: number, boundSize: number): boolean {
    return Math.abs(currentPosition) >= boundSize;
}

function updateProgramBrightness(program: HTMLElement, brightness = 1): void {
    $gsap.set(program, { filter: `brightness(${brightness})` });
}

function updateProgramOpacity(program: HTMLElement, opacity = 1): void {
    $gsap.to(program, { opacity, duration: 0.35 });
}

function updateProgramMargin(program: HTMLElement, margin = 0): void {
    $gsap.to(program, {
        marginInline: margin,
        duration: 0.15,
        ease: 'linear',
    });
}

function updateDOM(
    program: HTMLElement,
    newPositionIndex: number,
    insertPosition = 'before',
) {
    dockRef.value?.children[newPositionIndex]?.[insertPosition](program);
}

function initDock(): void {
    $Draggable.create('.dock__program', {
        cursor: 'revert',
        activeCursor: 'revert',
        type: 'x,y',
        bounds: '.container',
        onPress: function() {
            updateProgramBrightness(this.target, 0.5);
        },
        onRelease: function() {
            updateProgramBrightness(this.target);
        },
        onDragStart: function() {
            updateProgramBrightness(this.target);
        },
        onDrag: function() {
            if (isOutOfBound(this.y, 120)) {
                updateProgramOpacity(this.target, 0.4);
            } else {
                updateProgramOpacity(this.target);
            }

            if (isOutOfBound(this.y, 60)) {
                updateProgramMargin(this.target, -34);
            }

            const currentPositionIndex = Array.prototype.indexOf.call(dockRef.value.children, this.target);
            const relativePositionIndex = Math.round(this.x / 68);
            const newPositionIndex = currentPositionIndex + relativePositionIndex;

            if (parseInt(this.deltaY) >= 4 && !isOutOfBound(this.y, 20)) {
                updateDOM(this.target, newPositionIndex);
                updateProgramMargin(this.target);
            }

            if (
                !isOutOfBound(this.y, 60) &&
                currentPositionIndex !== newPositionIndex // prevent unnecessary DOM updates
            ) {
                if (this.x < 0) {
                    updateDOM(this.target, newPositionIndex);
                } else {
                    updateDOM(this.target, newPositionIndex, 'after');
                }
            }

            this.update(true, true);
        },
        onDragEnd: function() {
            if (isOutOfBound(this.y, 120)) {
                this.target.remove();
            }

            updateProgramMargin(this.target);
            $gsap.to(this.target, {
                x: 0,
                y: 0,
                duration: 0.35,
                ease: 'linear',
            });
        },
    });
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
    display: flex;
    inline-size: max-content;
    column-gap: $space-3;
    padding: $space-3;
    border-radius: $border-radius-3xl;
    border: $border-width-thin solid rgba($color-border, $opacity-low);
    backdrop-filter: $blur-xl;
    box-shadow: rgba($color-foreground, $opacity-low) 0 r(30) r(90);
    background-color: rgba($color-background, $opacity-low);
}

.dock__program {
    @include size($space-14);
}
</style>
