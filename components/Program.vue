<template>
    <div
        ref="programRef"
        class="program"
        @mousemove="detectAction($event)"
        @mousedown="startResize($event)"
        @mouseleave="updateCursor('unset')"
    >
        <slot />
    </div>
</template>

<script setup lang="ts">
const { $gsap, $Draggable } = useNuxtApp();

interface ProgramProps {
    draggableElements: HTMLElement[],
}

const props = defineProps<ProgramProps>();

const programRef = ref();

let draggable: Draggable[] | undefined;
let closestEdge: string;

function isPointerNearEdge(e: MouseEvent): boolean {
    const bounds = programRef.value?.getBoundingClientRect();
    const offsetX = Math.abs(Math.floor(e.offsetX));
    const offsetY = Math.abs(Math.floor(e.offsetY));

    return (bounds?.width - 3 <= offsetX || offsetX <= 1 || bounds?.height - 3 <= offsetY || offsetY <= 1) &&
        e.target === programRef.value;
}

function getClosestEdge(event: MouseEvent, element: Element): string {
    const elementBounds = element?.getBoundingClientRect();

    const pointerX = event.pageX;
    const pointerY = event.pageY;

    const leftEdge = elementBounds?.left;
    const rightEdge = elementBounds?.right;
    const topEdge = elementBounds?.top;
    const bottomEdge = elementBounds?.bottom;

    const leftEdgeDistance = Math.abs(leftEdge - pointerX);
    const rightEdgeDistance = Math.abs(rightEdge - pointerX);
    const topEdgeDistance = Math.abs(topEdge - pointerY);
    const bottomEdgeDistance = Math.abs(bottomEdge - pointerY);

    const smallestDistance = Math.min(
        leftEdgeDistance,
        rightEdgeDistance,
        topEdgeDistance,
        bottomEdgeDistance,
    );

    switch (smallestDistance) {
        case leftEdgeDistance:
            return 'left';
        case rightEdgeDistance:
            return 'right';
        case topEdgeDistance:
            return 'top';
        case bottomEdgeDistance:
            return 'bottom';
        default:
            return 'nothing';
    }
}

function updateCursor(type: string): void {
    $gsap.set(['.desktop__wallpaper', programRef.value], { cursor: type });
}

function detectAction(event: MouseEvent): void {
    if (!isPointerNearEdge(event)) {
        if (!$Draggable.get(programRef.value)) {
            initDraggable();
        }

        return;
    }

    if (draggable?.length) {
        draggable[0].kill();
    }

    const closestEdge = getClosestEdge(event, programRef.value);
    const cursor = closestEdge === 'left' || closestEdge === 'right' ? 'ew-resize' : 'ns-resize';

    updateCursor(cursor);
}

function startResize(event: MouseEvent): void {
    closestEdge = getClosestEdge(event, programRef.value);

    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', endResize);
}

// TODO: Maybe refactor.
function resize(e: MouseEvent): void {
    const bounds = programRef.value?.getBoundingClientRect();
    const inline = ['left', 'right'];

    let delta = 0;
    let cursor = 'unset';

    switch (closestEdge) {
        case 'left':
            delta = bounds.right - (e.clientX + bounds.width);
            cursor = delta < 0 ? 'e-resize' : 'w-resize';
            break;

        case 'right':
            delta = e.clientX - (bounds.left + bounds.width);
            cursor = delta < 0 ? 'w-resize' : 'e-resize';
            break;

        case 'top':
            delta = bounds.bottom - (e.clientY + bounds.height);
            cursor = delta < 0 ? 's-resize' : 'n-resize';
            break;

        case 'bottom':
            delta = e.clientY - (bounds.top + bounds.height);
            cursor = delta < 0 ? 'n-resize' : 's-resize';
            break;
    }

    if (inline.includes(closestEdge)) {
        $gsap.set(programRef.value, { inlineSize: bounds.width + delta });
    } else {
        $gsap.set(programRef.value, { blockSize: bounds.height + delta });
    }

    updateCursor(cursor);
}

function endResize(): void {
    updateCursor('unset');

    document.removeEventListener('mousemove', resize);
    document.removeEventListener('mouseup', endResize);
}

function initDraggable(): void {
    draggable = $Draggable.create(programRef.value, {
        cursor: 'revert',
        activeCursor: 'revert',
        zIndexBoost: false,
        bounds: { top: 24, left: -9999 },
        onPress: function(event: MouseEvent) {
            if (!props.draggableElements.includes(event.target)) {
                this.endDrag();
            }
        },
    });
}
</script>

<style lang="scss" scoped>
.program {
    @include size(80vw, 80vh);
    min-inline-size: r(800);
    min-block-size: r(200);
    max-inline-size: 100%;
    max-block-size: calc(100% - #{$space-6});
    position: absolute;
    inset-inline-start: 50%;
    inset-block-start: 45%;
    transform: translate(-50%, -50%);
    padding: $space-0;
    border-radius: $border-radius-xl;
    border: $border-width-thin solid rgba($color-gray, $opacity-low);
    overflow: hidden;
}
</style>
