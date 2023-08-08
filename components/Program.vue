<template>
    <div
        ref="programRef"
        class="program"
        :class="[
            { 'program--focused': globalStore.isProgramFocused(programName()) },
            { 'program--minimized': globalStore.isProgramMinimized(programName()) }
        ]"
        @mousemove="detectAction($event)"
        @mousedown="startResize($event)"
        @mouseleave="updateCursor('unset')"
    >
        <slot />
    </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from '~/store/global';

const globalStore = useGlobalStore();
const { $gsap, $Draggable } = useNuxtApp();

interface ProgramProps {
    draggableElements: Ref<HTMLElement[]> | undefined,
    horizontalResizeOnly?: boolean,
    verticalResizeOnly?: boolean,
}

const props = defineProps<ProgramProps>();

const programRef: Ref<HTMLElement | undefined> = ref();

let draggable: Draggable[] | undefined;
let closestEdge: string;

function programName(): string {
    const classList = programRef.value?.classList ?? ['program'];

    return classList[classList?.length - 1];
}

function isPointerNearEdge(e: MouseEvent): boolean {
    const bounds = programRef.value?.getBoundingClientRect();
    const offsetX = Math.abs(Math.floor(e.offsetX));
    const offsetY = Math.abs(Math.floor(e.offsetY));

    if (!bounds) {
        return false;
    }

    return (bounds.width - 3 <= offsetX || offsetX <= 1 || bounds.height - 3 <= offsetY || offsetY <= 1) &&
        e.target === programRef.value;
}

function getClosestEdge(event: MouseEvent, element: HTMLElement | undefined): string {
    const elementBounds = element?.getBoundingClientRect();

    if (!elementBounds) {
        return 'none';
    }

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
            return 'none';
    }
}

function isInline(event: MouseEvent): boolean {
    const closestEdge = getClosestEdge(event, programRef?.value);

    return closestEdge === 'left' || closestEdge === 'right';
}

function isBlock(event: MouseEvent): boolean {
    const closestEdge = getClosestEdge(event, programRef?.value);

    return closestEdge === 'top' || closestEdge === 'bottom';
}

function isResizable(event: MouseEvent): boolean {
    return (isInline(event) && !props.verticalResizeOnly) || (isBlock(event) && !props.horizontalResizeOnly);
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

    if (!isResizable(event)) {
        return;
    }

    const cursor = isInline(event) ? 'ew-resize' : 'ns-resize';

    updateCursor(cursor);
}

function startResize(event: MouseEvent): void {
    closestEdge = getClosestEdge(event, programRef?.value);

    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', endResize);
}

// TODO: Maybe refactor.
function resize(event: MouseEvent): void {
    if (!isResizable(event)) {
        return;
    }

    const bounds = programRef.value?.getBoundingClientRect();

    if (!bounds) {
        return;
    }

    const inline = ['left', 'right'];

    let delta = 0;
    let cursor = 'unset';

    switch (closestEdge) {
        case 'left':
            delta = bounds.right - (event.clientX + bounds.width);
            cursor = delta < 0 ? 'e-resize' : 'w-resize';
            break;

        case 'right':
            delta = event.clientX - (bounds.left + bounds.width);
            cursor = delta < 0 ? 'w-resize' : 'e-resize';
            break;

        case 'top':
            delta = bounds.bottom - (event.clientY + bounds.height);
            cursor = delta < 0 ? 's-resize' : 'n-resize';
            break;

        case 'bottom':
            delta = event.clientY - (bounds.top + bounds.height);
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
        bounds: { top: 24, left: -9999 },
        onPress: function(event: MouseEvent) {
            globalStore.focusProgram(programName());

            if (!props.draggableElements?.includes(event.target as HTMLElement)) {
                this.endDrag();
            }
        },
    });
}
</script>

<style lang="scss" scoped>
.program {
    max-inline-size: 100%;
    max-block-size: calc(100% - #{$space-6});
    position: absolute;
    inset-inline-start: 50%;
    inset-block-start: 45%;
    transform: translate(-50%, -50%);
    border: $border-width-thin solid rgba($color-foreground, $opacity-low);
    border-radius: $border-radius-xl;
    overflow: hidden;

    &--focused {
        box-shadow: rgba($color-foreground, 0.3) 0 $space-4 $space-8;
        // Focus on program (1999 - less than menu bar and dock).
        z-index: 1999 !important;
    }

    &--minimized {
        max-inline-size: unset;
        max-block-size: unset;
        transform: translate(-50%, -50%) translate3d(0, 0, 0) scale(0.07) !important;
        box-shadow: none;
    }
}
</style>
