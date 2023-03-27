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

function isEdgeElement(position: number): boolean {
    return (position === 0 || position === programs.length - 1);
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
) {
    if (isEdgeElement(newPosition)) {
        return;
    }

    dockRef.value?.children[newPosition]?.[insertType](program);
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
        onDragStart: function() {
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

            const currentPosition = Array.prototype.indexOf.call(dockRef.value.children, this.target);
            const relativePosition = Math.round(this.x / 68);
            const newPosition = currentPosition + relativePosition;

            if (isEdgeElement(currentPosition)) {
                this.endDrag(this.target);
                return;
            }

            // Prevent unnecessary DOM updates.
            if (
                !isOutOfBoundY(this.y, 50) &&
                !isEdgeElement(currentPosition) &&
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
            if (isOutOfBoundY(this.y, 150)) {
                this.target.remove();
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
        @include size(auto, $space-16);
        // Override GSAP
        margin-inline-start: $space-3 !important;
        margin-inline-end: -$space-2 !important;
        padding-inline-start: $space-3;
        border-inline-start: $border-width-thin solid rgba($color-foreground, $opacity-low);
    }
}
</style>
