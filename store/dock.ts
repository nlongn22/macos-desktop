export const useDockStore = defineStore('dock', () => {
    const dockBounds: Ref<DOMRect | undefined> = ref();

    function addBounds(bounds: DOMRect | undefined): void {
        dockBounds.value = bounds;
    }

    return { dockBounds, addBounds };
});
