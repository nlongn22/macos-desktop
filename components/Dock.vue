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
    'trash',
];

const dockRef = ref();

function isEdgeElement(positionIndex: number): boolean {
    return (positionIndex === 0 || positionIndex === programs.length - 1);
}

function isOutOfBoundX(currentPosition: number): boolean {
    return Math.abs(currentPosition) > 100;
}

function isOutOfBoundY(currentPosition: number, boundSize: number): boolean {
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
    if (isEdgeElement(newPositionIndex)) {
        return;
    }

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
            if (isOutOfBoundY(this.y, 150)) {
                updateProgramOpacity(this.target, 0.4);
            } else {
                updateProgramOpacity(this.target);
            }

            if (isOutOfBoundX(this.x) || isOutOfBoundY(this.y, 50)) {
                updateProgramMargin(this.target, -34);
            } else {
                updateProgramMargin(this.target);
            }

            const currentPositionIndex = Array.prototype.indexOf.call(dockRef.value.children, this.target);
            const relativePositionIndex = Math.round(this.x / 68);
            const newPositionIndex = currentPositionIndex + relativePositionIndex;

            if (isEdgeElement(currentPositionIndex)) {
                this.endDrag(this.target);
                return;
            }

            // Prevent unnecessary DOM updates.
            if (
                !isOutOfBoundY(this.y, 50) &&
                !isEdgeElement(currentPositionIndex) &&
                currentPositionIndex !== newPositionIndex
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
            if (isOutOfBoundY(this.y, 150)) {
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
    inline-size: max-content;
    display: flex;
    align-items: center;
    column-gap: $space-3;
    padding: $space-3;
    padding-block-start: $space-2;
    border-radius: $border-radius-3xl;
    border: $border-width-thin solid rgba($color-border, $opacity-low);
    backdrop-filter: $blur-xl;
    box-shadow: rgba($color-foreground, $opacity-low) 0 r(30) r(90);
    background-color: rgba($color-background, $opacity-low);
}

.dock__program {
    @include size($space-14);

    &:last-child {
        inline-size: auto;
        block-size: $space-16;
        // Override GSAP
        margin-inline-start: $space-3 !important;
        margin-inline-end: -$space-2 !important;
        padding-inline-start: $space-3;
        border-inline-start: $border-width-thin solid rgba($color-foreground, $opacity-low);
    }
}
</style>
