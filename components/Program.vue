<template>
    <div
        ref="programRef"
        class="program"
        @mousemove="detectAction($event)"
        @mousedown="startResize($event)"
        @mouseleave="updateCursor('unset')"
    >
        <svg class="svg">
            <clipPath
                id="initial-path"
                clipPathUnits="objectBoundingBox"
            >
                <path d="M0,0 L1,0 C1,0.308,1,0.692,1,1 L0,1 C0,0.385,0,0.462,0,0">
                    <animate
                        ref="animateRef"
                        attributeName="d"
                        begin="indefinite"
                        fill="freeze"
                        dur="0.2s"
                        :to="clipPath"
                    />
                </path>
            </clipPath>
        </svg>

        <slot />
    </div>
</template>

<script setup lang="ts">
import { useDockStore } from '~/store/dock';

const dockStore = useDockStore();
const { $gsap, $Draggable } = useNuxtApp();

interface ProgramProps {
    draggableElements: HTMLElement[] | undefined,
    isMinimized: boolean,
}

const props = defineProps<ProgramProps>();

const programRef: Ref<HTMLElement | undefined> = ref();
const animateRef: Ref<SVGAnimationElement | undefined> = ref();

const clipPath = ref('M0,0 L1,0 C1,0.385,0.813,0.692,0.813,1 L0.781,1 C0.75,0.462,0.063,0.462,0,0');

let draggable: Draggable[] | undefined;
let closestEdge: string;

watch(
    () => props.isMinimized,
    () => {
        minimize();
    },
);

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

    const closestEdge = getClosestEdge(event, programRef?.value);
    const cursor = closestEdge === 'left' || closestEdge === 'right' ? 'ew-resize' : 'ns-resize';

    updateCursor(cursor);
}

function startResize(event: MouseEvent): void {
    closestEdge = getClosestEdge(event, programRef?.value);

    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', endResize);
}

// TODO: Maybe refactor.
function resize(e: MouseEvent): void {
    const bounds = programRef.value?.getBoundingClientRect();

    if (!bounds) {
        return;
    }

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

function minimize(): void {
    const programOffsetLeft = programRef.value?.getBoundingClientRect().left;
    const dockOffsetRight = window.innerWidth - (dockStore.dockBounds?.right ?? 0);
    const programToDockDistance = window.innerWidth - (programOffsetLeft ?? 0) - dockOffsetRight;
    console.log(programToDockDistance);

    animateRef.value?.beginElement();

    setTimeout(() => {
        $gsap.to('.safari', {});
    }, 150);
}

function initDraggable(): void {
    draggable = $Draggable.create(programRef.value, {
        cursor: 'revert',
        activeCursor: 'revert',
        zIndexBoost: false,
        bounds: { top: 24, left: -9999 },
        onPress: function(event: MouseEvent) {
            if (!props.draggableElements?.includes(event.target as HTMLElement)) {
                this.endDrag();
            }
        },
        onDrag: () => {
            const dockOffset = window.innerWidth - (dockStore.dockBounds?.right ?? 0);

            const programOffsetLeft = programRef.value?.getBoundingClientRect().left;
            const programLeftToDockDistance = window.innerWidth - (programOffsetLeft ?? 0) - dockOffset;
            const resultLeft = programLeftToDockDistance / 1000;

            const programOffsetRight = window.innerWidth - (programRef.value?.getBoundingClientRect().right ?? 0);
            const programRightToDockDistance = window.innerWidth - (programOffsetRight ?? 0) - (dockStore.dockBounds?.right ?? 0);
            const resultRight = programRightToDockDistance / 1000;

            clipPath.value = `M0,0 L1,0 C1,0.385,${resultRight},0.692,${resultRight},1 L${resultLeft},1 C${resultLeft},0.462,0.063,0.462,0,0`;
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
    clip-path: url(#initial-path);
}
</style>
